import { db } from "@/libs/kysely";
import { sql } from "kysely";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { unstable_cache } from "next/cache";

export const getPlayerTableData = unstable_cache(
  async ({
    seasonId,
    playerId,
    userId,
  }: {
    seasonId: string;
    playerId: string;
    userId?: string;
  }) => {
    return await db
      .selectFrom("match_players as mp")
      .innerJoin("matches as m", "m.id", "mp.match_id")
      .leftJoin("votes as v", (join) => {
        let voteJoin = join
          .onRef("v.match_id", "=", "mp.match_id")
          .onRef("v.player_id", "=", "mp.player_id");

        if (userId) {
          voteJoin = voteJoin.on("v.user_id", "=", userId); // Include votes for specific user_id if provided
        }

        return voteJoin;
      })
      .select((eb) => [
        "m.id as match_id",
        "m.location",
        "m.result",
        "m.scores",
        "m.start_date",
        "m.active",
        "m.published",

        eb.cast<number>(eb.fn.sum("v.rating"), "integer").as("total_rating"),
        eb.cast<number>(eb.fn.avg("v.rating"), "float4").as("avg_rating"),
        eb.cast<number>(eb.fn.count("v.id"), "integer").as("vote_count"),
        eb
          .cast<number>(
            eb.fn.sum(sql<number>`CASE WHEN v.motm THEN 1 ELSE 0 END`),
            "integer"
          )
          .as("motm_count"),

        eb
          .cast<number>(
            eb.fn.sum(sql<number>`CASE WHEN v.botm THEN 1 ELSE 0 END`),
            "integer"
          )
          .as("botm_count"),
        eb.cast<number>(eb.fn.min("v.rating"), "integer").as("min_rating"),
        eb.cast<number>(eb.fn.max("v.rating"), "integer").as("max_rating"),
        eb
          .cast<number>(
            eb.fn
              .sum(eb("v.rating", "-", eb.val(5)))
              .filterWhere("v.rating", "<", 5),
            "integer"
          )
          .as("diff_negative"),
        eb
          .cast<number>(
            eb.fn
              .sum(eb("v.rating", "-", eb.val(5)))
              .filterWhere("v.rating", ">", 5),
            "integer"
          )
          .as("diff_positive"),
        jsonObjectFrom(
          eb
            .selectFrom("clubs as o")
            .selectAll()
            .whereRef("m.opponent_id", "=", "o.id")
        ).as("opponent"),
        jsonObjectFrom(
          eb
            .selectFrom("competitions as c")
            .selectAll()
            .whereRef("m.competition_id", "=", "c.id")
        ).as("competition"),
      ])
      .where("mp.player_id", "=", playerId)
      .where("m.season_id", "=", seasonId)
      .groupBy(["m.id"])
      .orderBy("m.start_date", "asc") // Order by match start date
      .execute();
  },
  ["public-players"],
  { tags: ["public"], revalidate: 60 }
);
