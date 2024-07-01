import { MatchTableBuilder } from "./match-table-builder";
import { TEST_AUTH_USER_ID } from "@/constants";
import { getMatchTableData } from "@/db/queries/get-match-table-data";
import { Filters } from "@/types/filters";

export type MatchTableData = Awaited<ReturnType<typeof getMatchTableData>>[0];

type MatchTableProps = {
  matchId: string;
  filters: {
    source: Filters["source"];
  };
};

export async function MatchTable({ matchId, filters }: MatchTableProps) {
  const userId = TEST_AUTH_USER_ID;

  const matchTableData = await getMatchTableData({
    matchId: matchId,
    userId: filters.source === "user" ? userId : undefined,
  });

  if (!matchTableData) {
    return (
      <div className="flex w-full justify-center items-center h-16">
        <span>
          There is no match corresponding to your search. Try something else.
        </span>
      </div>
    );
  }

  return (
    <MatchTableBuilder
      data={matchTableData}
      isUser={filters.source === "user"}
    />
  );
}
