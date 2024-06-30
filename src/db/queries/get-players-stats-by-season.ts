import { db } from "@/libs/kysely";
import { sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export async function getPlayersStatsBySeason(seasonId: string) {
  return await db
    .selectFrom("players as p")
    .innerJoin("season_players as sp", "p.id", "sp.player_id")
    .where("sp.season_id", "=", seasonId)
    .select((eb) => [
      "p.id as player_id",
      "p.first_name",
      "p.last_name",
      "p.country_code",
      "p.avatar_url",
      jsonArrayFrom(
        eb
          .selectFrom("match_players as mp")
          .innerJoin("matches as m", "mp.match_id", "m.id")
          .leftJoin("votes as v", (join) =>
            join
              .onRef("v.match_id", "=", "m.id")
              .onRef("v.player_id", "=", "mp.player_id")
          )
          .leftJoin("clubs as o", "m.opponent_id", "o.id")
          .leftJoin("competitions as c", "m.competition_id", "c.id")
          .select((nestedEb) => [
            "m.id",
            "m.season_id",
            "m.competition_id",
            "m.opponent_id",
            "m.location",
            "m.result",
            "m.scores",
            "m.start_date",
            (eb) =>
              eb
                .cast<number>(eb.fn.sum("v.rating"), "integer")
                .as("total_rating"),
            (eb) =>
              eb.cast<number>(eb.fn.count("v.id"), "integer").as("vote_count"),
            (eb) =>
              eb
                .cast<number>(
                  eb.fn.sum(sql<number>`CASE WHEN v.motm THEN 1 ELSE 0 END`),
                  "integer"
                )
                .as("motm_count"),
            (eb) =>
              eb
                .cast<number>(
                  eb.fn.sum(sql<number>`CASE WHEN v.botm THEN 1 ELSE 0 END`),
                  "integer"
                )
                .as("botm_count"),
            jsonObjectFrom(
              nestedEb
                .selectFrom("clubs as o")
                .selectAll()
                .whereRef("m.opponent_id", "=", "o.id")
            ).as("opponent"),
            jsonObjectFrom(
              nestedEb
                .selectFrom("competitions as c")
                .selectAll()
                .whereRef("m.competition_id", "=", "c.id")
            ).as("competition"),
          ])
          .whereRef("mp.player_id", "=", "p.id")
          .groupBy(["m.id", "mp.player_id", "o.id", "c.id"])
          .orderBy("m.start_date asc")
      ).as("matches"),
    ])
    .execute();
}
