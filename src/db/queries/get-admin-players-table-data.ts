import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAdminPlayersTableData = unstable_cache(async () => {
  return await db
    .selectFrom("players as p")
    .leftJoin("match_players as mp", "p.id", "mp.player_id")
    .leftJoin("season_players as sp", "p.id", "sp.player_id")
    .select((eb) => [
      "p.id as player_id",
      "p.first_name",
      "p.last_name",
      "p.birth_date",
      "p.country_code",
      "p.avatar_url",
      (eb) =>
        eb
          .cast<number>(eb.fn.count("mp.id").distinct(), "integer")
          .as("matches_count"),
      (eb) =>
        eb
          .cast<number>(eb.fn.count("sp.id").distinct(), "integer")
          .as("seasons_count"),
    ])
    .groupBy(["p.id"])
    .execute();
}, []);
