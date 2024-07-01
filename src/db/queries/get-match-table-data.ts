import { db } from "@/libs/kysely";
import { sql } from "kysely";
import { unstable_cache } from "next/cache";

export const getMatchTableData = unstable_cache(
  async ({ matchId, userId }: { matchId: string; userId?: string }) => {
    return await db
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
        ebx.cast<number>(ebx.fn.sum("v.rating"), "integer").as("total_rating"),
        ebx.cast<number>(ebx.fn.min("v.rating"), "integer").as("min_rating"),
        ebx.cast<number>(ebx.fn.max("v.rating"), "integer").as("max_rating"),
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
        ebx.cast<number>(ebx.fn.count("v.id"), "integer").as("vote_count"),
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
      .where("mp.match_id", "=", matchId)
      .groupBy(["p.id"])
      .execute();
  },

  ["matches", "players", "votes"]
);
