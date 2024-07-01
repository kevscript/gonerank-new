import { getPublishedSeasons } from "@/db/queries/seasons";
import { SeasonFilter } from "./season-filter";
import { getAllCompetitions } from "@/db/queries/competitions";
import { CompetitionFilter } from "./competition-filter";
import { LocationFilter } from "./location-filter";
import { ResultFilter } from "./result-filter";
import { SourceFilter } from "./source-filter";

export async function FilterGroup() {
  const seasons = await getPublishedSeasons();
  const competition = await getAllCompetitions();

  return (
    <div className="flex gap-4 items-center w-full flex-wrap">
      <div className="mr-auto">
        <SourceFilter />
      </div>
      <ResultFilter />
      <LocationFilter />
      <CompetitionFilter competitions={competition} />
      <SeasonFilter seasons={seasons} />
    </div>
  );
}
