import { SourceFilter } from "@/components/filters/source-filter";
import { MatchHeader } from "@/components/match-header";
import { MatchTable } from "@/components/tables/match/match-table";
import { generateFiltersFromParams } from "@/utils/generate-filters-from-params";
import { validateFilterParams } from "@/utils/validate-filter-params";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MatchPage({
  params,
}: {
  params: { matchId: string };
}) {
  const headerSearchParams = new URLSearchParams(
    headers().get("x-current-search-params") || ""
  );

  const { valid, searchParams } = await validateFilterParams(
    headerSearchParams
  );

  if (!valid) {
    redirect(`/matches/${params.matchId}?${searchParams}`);
  }

  const filters = generateFiltersFromParams(searchParams);

  const activeTab =
    searchParams.get("tab")?.trim().toLowerCase() === "chart"
      ? "chart"
      : "table";

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <MatchHeader matchId={params.matchId} />

      <div className="my-8">
        <SourceFilter />
      </div>

      <MatchTable matchId={params.matchId} filters={filters} />
    </div>
  );
}
