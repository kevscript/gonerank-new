import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getMatchInfos = unstable_cache(
  async ({ matchId }: { matchId: string }) => {
    try {
      const infos = await db
        .selectFrom("matches as m")
        .innerJoin("clubs as o", "o.id", "m.opponent_id")
        .innerJoin("competitions as c", "c.id", "m.competition_id")
        .innerJoin("seasons as s", "s.id", "m.season_id")
        .select((eb) => [
          "m.id",
          "m.active",
          "m.published",
          "m.start_date",
          "m.location",
          "m.result",
          "m.scores",
          "o.full_name as opponent_full_name",
          "o.country_code as opponent_country_code",
          "o.name_code as opponent_name_code",
          "o.country_code as opponent_country_code",
          "o.logo_url as opponent_logo_url",
          "o.primary_color as opponent_primary_color",
          "o.secondary_color as opponent_secondary_color",
          "c.full_name as competition_full_name",
          "c.name_code as competition_name_code",
          "c.logo_url as competition_logo_url",
          "c.primary_color as competition_primary_color",
          "c.secondary_color as competition_secondary_color",
          "s.period as season_period",
        ])
        .where("m.id", "=", matchId)
        .executeTakeFirst();
      return infos;
    } catch (err: any) {
      console.log("getMatchInfos ERROR", err);
      throw new Error(err);
    }
  }
);
