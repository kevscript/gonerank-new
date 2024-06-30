import { MatchesPageHeader } from "@/components/matches-page-header";
import { MatchesTable } from "@/components/tables/matches/matches-table";
import { db } from "@/libs/kysely";
import { Suspense } from "react";

type SearchParams = {
  season?: string;
  tab?: string;
};

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const publishedSeasons = await db
    .selectFrom("seasons")
    .selectAll()
    .where("published", "=", true)
    .orderBy("end_date desc")
    .execute();

  let activeSeasonId = null;

  const seasonExists = searchParams.season
    ? publishedSeasons.find((season) => season.period === searchParams.season)
    : undefined;

  // no season in search params or does not exist
  if (!searchParams.season || !seasonExists) {
    const activeSeason = publishedSeasons.find((season) => season.active);
    if (!activeSeason) {
      activeSeasonId = publishedSeasons[0].id;
    } else {
      activeSeasonId = activeSeason.id;
    }
  } else {
    activeSeasonId = seasonExists.id;
  }

  const tabParam = searchParams.tab?.trim().toLowerCase();
  const activeTab = tabParam === "chart" ? "chart" : "table";

  return (
    <main className="p-12">
      <MatchesPageHeader />

      <div className="w-full bg-neutral-100 h-12 my-8 flex justify-center items-center">
        <span>Filters</span>
      </div>

      {activeTab === "table" && (
        <Suspense fallback={"Loading..."}>
          <MatchesTable seasonId={activeSeasonId} />
        </Suspense>
      )}
      {activeTab === "chart" && (
        <div>
          <span>Chart Tab Active</span>
        </div>
      )}
    </main>
  );
}
