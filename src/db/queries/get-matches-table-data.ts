import { db } from "@/libs/kysely";
import { sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";
import { unstable_cache } from "next/cache";

export const getMatchesTableData = unstable_cache(
  async ({ seasonId, userId }: { seasonId: string; userId?: string }) => {
    return await db
      .selectFrom("matches as m")
      .where("m.published", "=", true)
      .where("m.season_id", "=", seasonId)
      .select((eb) => [
        "m.id as match_id",
        "m.location",
        "m.result",
        "m.start_date",
        "m.active",
        "m.published",
        "m.opponent_id",
        "m.competition_id",

        jsonObjectFrom(
          eb
            .selectFrom("seasons as s")
            .selectAll()
            .whereRef("m.season_id", "=", "s.id")
        ).as("season"),

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

        jsonArrayFrom(
          eb
            .selectFrom("match_players as mp")
            .innerJoin("players as p", "mp.player_id", "p.id")
            .leftJoin("votes as v", (join) => {
              let voteJoin = join
                .onRef("v.match_id", "=", "mp.match_id")
                .onRef("v.player_id", "=", "mp.player_id");

              if (userId) {
                voteJoin = voteJoin.on("v.user_id", "=", userId); // Include votes for specific user_id if provided
              }

              return voteJoin;
            })
            .select((ebx) => [
              "p.id as player_id",
              "p.first_name",
              "p.last_name",
              "p.avatar_url",
              ebx
                .cast<number>(ebx.fn.sum("v.rating"), "integer")
                .as("total_rating"),
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
            ])
            .whereRef("mp.match_id", "=", "m.id")
            .groupBy(["p.id"])
        ).as("players"),
      ])
      .orderBy("m.start_date")
      .execute();
  },
  ["public-matches"],
  { tags: ["public"], revalidate: 60 }
);
