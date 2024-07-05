import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAdminSeasonsTableData = unstable_cache(
  async () => {
    return await db
      .selectFrom("seasons as s")
      .leftJoin("matches as m", "s.id", "m.season_id")
      .leftJoin("season_players as sp", "s.id", "sp.season_id")
      .select((eb) => [
        "s.id as season_id",
        "s.active",
        "s.end_date",
        "s.start_date",
        "s.published",
        "s.period",
        (eb) =>
          eb
            .cast<number>(eb.fn.count("m.id").distinct(), "integer")
            .as("matches_count"),
        (eb) =>
          eb
            .cast<number>(eb.fn.count("sp.id").distinct(), "integer")
            .as("players_count"),
      ])
      .groupBy(["s.id"])
      .execute();
  },
  ["admin-seasons"],
  { tags: ["admin"], revalidate: 60 }
);
