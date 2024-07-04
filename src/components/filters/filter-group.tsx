import { getPublishedSeasons } from "@/db/queries/seasons";
import { SeasonFilter } from "./season-filter";
import { getAllCompetitions } from "@/db/queries/competitions";
import { CompetitionFilter } from "./competition-filter";
import { LocationFilter } from "./location-filter";
import { ResultFilter } from "./result-filter";
import { SourceFilter } from "./source-filter";
import { Suspense } from "react";

export async function FilterGroup() {
  const [seasons, competitions] = await Promise.all([
    getPublishedSeasons(),
    getAllCompetitions(),
  ]);

  return (
    <div className="flex gap-4 items-center w-full flex-wrap">
      <Suspense fallback={<span>Loading....</span>}>
        <div className="mr-auto">
          <SourceFilter />
        </div>
        <ResultFilter />
        <LocationFilter />
        <CompetitionFilter competitions={competitions} />
        <SeasonFilter seasons={seasons} />
      </Suspense>
    </div>
  );
}
