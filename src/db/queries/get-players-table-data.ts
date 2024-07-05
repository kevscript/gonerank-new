import { db } from "@/libs/kysely";
import { sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import { unstable_cache } from "next/cache";

export const getPlayersTableData = unstable_cache(
  async ({ seasonId, userId }: { seasonId: string; userId?: string }) => {
    return await db
      .selectFrom("players as p")
      .innerJoin("season_players as sp", "p.id", "sp.player_id")
      .where("sp.season_id", "=", seasonId)
      .select((eb) => [
        "p.id as player_id",
        "p.first_name",
        "p.last_name",
        "p.avatar_url",
        jsonArrayFrom(
          eb
            .selectFrom("match_players as mp")
            .innerJoin("matches as m", "mp.match_id", "m.id")
            .where("m.season_id", "=", seasonId)
            .leftJoin("votes as v", (join) => {
              let voteJoin = join
                .onRef("v.match_id", "=", "mp.match_id")
                .onRef("v.player_id", "=", "mp.player_id");

              if (userId) {
                voteJoin = voteJoin.on("v.user_id", "=", userId); // Include votes for specific user_id if provided
              }

              return voteJoin;
            })
            .leftJoin("clubs as o", "m.opponent_id", "o.id")
            .leftJoin("competitions as c", "m.competition_id", "c.id")
            .select((ebx) => [
              "m.id",
              "m.season_id",
              "m.competition_id",
              "m.opponent_id",
              "m.location",
              "m.result",
              "m.scores",
              "m.start_date",
              "mp.id",
              "mp.minutes_played",
              "mp.player_position",
              "mp.player_status",
              ebx
                .cast<number>(ebx.fn.sum("v.rating"), "integer")
                .as("total_rating"),
              ebx
                .cast<number>(ebx.fn.avg("v.rating"), "decimal")
                .as("avg_rating"),
              ebx
                .cast<number>(ebx.fn.count("v.id"), "integer")
                .as("vote_count"),
              ebx
                .cast<number>(
                  ebx.fn.sum(sql<number>`CASE WHEN v.motm THEN 1 ELSE 0 END`),
                  "integer"
                )
                .as("motm_count"),

              ebx
                .cast<number>(
                  ebx.fn.sum(sql<number>`CASE WHEN v.botm THEN 1 ELSE 0 END`),
                  "integer"
                )
                .as("botm_count"),
              ebx
                .cast<number>(ebx.fn.min("v.rating"), "integer")
                .as("min_rating"),
              ebx
                .cast<number>(ebx.fn.max("v.rating"), "integer")
                .as("max_rating"),
              ebx
                .cast<number>(
                  ebx.fn
                    .sum(ebx("v.rating", "-", ebx.val(5)))
                    .filterWhere("v.rating", "<", 5),
                  "integer"
                )
                .as("diff_negative"),
              ebx
                .cast<number>(
                  ebx.fn
                    .sum(ebx("v.rating", "-", ebx.val(5)))
                    .filterWhere("v.rating", ">", 5),
                  "integer"
                )
                .as("diff_positive"),
              jsonObjectFrom(
                ebx
                  .selectFrom("clubs as o")
                  .selectAll()
                  .whereRef("m.opponent_id", "=", "o.id")
              ).as("opponent"),
              jsonObjectFrom(
                ebx
                  .selectFrom("competitions as c")
                  .selectAll()
                  .whereRef("m.competition_id", "=", "c.id")
              ).as("competition"),
            ])
            .whereRef("mp.player_id", "=", "p.id")
            .groupBy(["m.id", "mp.id"])
            .orderBy("m.start_date asc")
        ).as("matches"),
      ])
      .execute();
  },
  ["public-players"],
  { tags: ["public"], revalidate: 60 }
);
