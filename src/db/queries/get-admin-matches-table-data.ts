import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAdminMatchesTableData = unstable_cache(
  async () => {
    return await db
      .selectFrom("matches as m")
      .innerJoin("seasons as s", "m.season_id", "s.id")
      .innerJoin("competitions as c", "m.competition_id", "c.id")
      .innerJoin("clubs as o", "m.opponent_id", "o.id")
      .leftJoin("match_players as mp", "m.id", "mp.match_id")
      .select((eb) => [
        "m.id as match_id",
        "m.active",
        "m.published",
        "m.season_id",
        "m.competition_id",
        "m.opponent_id",
        "m.location",
        "m.start_date",
        "m.result",
        "m.scores",
        "s.period as season_period",
        "c.name_code as competition_name_code",
        "o.logo_url as opponent_logo_url",
        "o.full_name as opponent_full_name",
        "o.name_code as opponent_name_code",
        (eb) =>
          eb
            .cast<number>(eb.fn.count("mp.id"), "integer")
            .as("match_players_count"),
      ])
      .groupBy([
        "m.id",
        "s.period",
        "c.name_code",
        "o.logo_url",
        "o.full_name",
        "o.name_code",
      ])
      .orderBy("m.start_date asc")
      .execute();
  },
  ["admin-matches"],
  { tags: ["admin"], revalidate: 60 }
);
