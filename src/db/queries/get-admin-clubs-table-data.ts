import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAdminClubsTableData = unstable_cache(
  async () => {
    return await db
      .selectFrom("clubs as c")
      .leftJoin("matches as m", "c.id", "m.opponent_id")
      .select((eb) => [
        "c.id as club_id",
        "c.full_name",
        "c.name_code",
        "c.logo_url",
        "c.primary_color",
        "c.secondary_color",
        eb
          .cast<number>(eb.fn.count("m.id").distinct(), "integer")
          .as("matches_count"),
      ])
      .groupBy(["c.id"])
      .execute();
  },
  ["admin-clubs"],
  { tags: ["admin"] }
);
