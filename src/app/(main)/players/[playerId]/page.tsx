import { FilterGroup } from "@/components/filters/filter-group";
import { PlayerHeader } from "@/components/player-header";
import { PlayerTable } from "@/components/tables/player/player-table";
import { generateFiltersFromParams } from "@/utils/generate-filters-from-params";
import { validateFilterParams } from "@/utils/validate-filter-params";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlayerPage({
  params,
}: {
  params: { playerId: string };
}) {
  const headerSearchParams = new URLSearchParams(
    headers().get("x-current-search-params") || ""
  );

  const { valid, searchParams } = await validateFilterParams(
    headerSearchParams
  );

  if (!valid) {
    redirect(`/players/${params.playerId}?${searchParams}`);
  }

  const filters = generateFiltersFromParams(searchParams);

  const activeTab =
    searchParams.get("tab")?.trim().toLowerCase() === "chart"
      ? "chart"
      : "table";

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <PlayerHeader playerId={params.playerId} />

      <div className="my-8">
        <FilterGroup />
      </div>

      <PlayerTable filters={filters} playerId={params.playerId} />
    </div>
  );
}
