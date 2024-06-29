import { db } from "@/libs/kysely";
import { sql } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export async function getMatchStatsBySeason(seasonId: string) {
  return await db
    .selectFrom("matches as m")
    .where("m.published", "=", true)
    .innerJoin("seasons as s", "m.season_id", "s.id")
    .where("s.id", "=", seasonId)
    .select((eb) => [
      "m.id as match_id",
      "m.location",
      "m.result",
      "m.start_date",
      "m.active",
      "m.published",
      "m.opponent_id",
      "m.competition_id",
      jsonArrayFrom(
        eb
          .selectFrom("match_players as mp")
          .innerJoin("players as p", "mp.player_id", "p.id")
          .leftJoin("votes as v", (join) =>
            join
              .onRef("v.match_id", "=", "mp.match_id")
              .onRef("v.player_id", "=", "p.id")
          )
          .select(() => [
            "p.id as player_id",
            "p.first_name",
            "p.last_name",
            (eb) =>
              eb.cast(eb.fn.sum("v.rating"), "integer").as("total_rating"),
            (eb) => eb.cast(eb.fn.max("v.rating"), "integer").as("max_rating"),
            (eb) => eb.cast(eb.fn.min("v.rating"), "integer").as("min_rating"),
            (eb) => eb.cast(eb.fn.count("v.id"), "integer").as("vote_count"),
            (eb) =>
              eb
                .cast(
                  eb.fn.sum(sql<number>`CASE WHEN v.motm THEN 1 ELSE 0 END`),
                  "integer"
                )
                .as("motm_count"),
            (eb) =>
              eb
                .cast(
                  eb.fn.sum(sql<number>`CASE WHEN v.botm THEN 1 ELSE 0 END`),
                  "integer"
                )
                .as("botm_count"),
          ])
          .whereRef("mp.match_id", "=", "m.id")
          .groupBy(["p.id", "mp.match_id"])
      ).as("players"),
    ])
    .groupBy("m.id")
    .orderBy("m.start_date")
    .execute();
}
