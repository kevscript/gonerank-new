import { MatchesTableBuilder } from "./matches-table-builder";
import { TEST_AUTH_USER_ID } from "@/constants";
import { getMatchesTableData } from "@/db/queries/get-matches-table-data";
import { Filters } from "@/types/filters";
import { paramToSeason } from "@/utils/param-parsers";

export type MatchesTableData = Awaited<
  ReturnType<typeof getMatchesTableData>
>[0];

type MatchesTableProps = {
  filters: Filters;
};

export async function MatchesTable({ filters }: MatchesTableProps) {
  const userId = TEST_AUTH_USER_ID;
  const activeSeason = await paramToSeason(filters.season);

  const matchesTableData = await getMatchesTableData({
    seasonId: activeSeason.id,
    userId: filters.source === "user" ? userId : undefined,
  });

  let formatedMatchesTableData = [...matchesTableData].filter((match) => {
    const hasCompetition =
      !filters.competition ||
      match.competition?.name_code.trim().toLowerCase() ===
        filters.competition.trim().toLowerCase();
    const hasLocation =
      !filters.location ||
      filters.location.length === 0 ||
      filters.location.includes(match.location.toLowerCase());
    const hasResult =
      !filters.result ||
      filters.result.length === 0 ||
      filters.result.includes(match.result.toLowerCase());

    return hasCompetition && hasLocation && hasResult;
  });

  if (formatedMatchesTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center h-16">
        <span>
          There is no matches corresponding to current filtering options. Try
          something else.
        </span>
      </div>
    );
  }

  return <MatchesTableBuilder data={formatedMatchesTableData} />;
}
