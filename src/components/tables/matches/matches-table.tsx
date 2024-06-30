import { getMatchesStatsBySeason } from "@/db/queries/get-matches-stats-by-season";
import { MatchesTableBuilder } from "./matches-table-builder";

export type MatchesTableItem = Awaited<
  ReturnType<typeof getMatchesStatsBySeason>
>[0];

export async function MatchesTable({ seasonId }: { seasonId: string }) {
  const matchesStatsBySeason = await getMatchesStatsBySeason(seasonId);
  const matchesTableData: MatchesTableItem[] = matchesStatsBySeason;

  return (
    <div>
      <MatchesTableBuilder data={matchesTableData} />
    </div>
  );
}
