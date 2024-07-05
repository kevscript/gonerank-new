import { BreadCrumbs } from "@/components/breadcrumbs/bread-crumbs";
import { FilterGroup } from "@/components/filters/filter-group";
import { PlayersTabs } from "@/components/players-tabs";
import { PlayersTable } from "@/components/tables/players/players-table";
import { generateFiltersFromParams } from "@/utils/generate-filters-from-params";
import { validateFilterParams } from "@/utils/validate-filter-params";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlayersPage() {
  const headerSearchParams = new URLSearchParams(
    headers().get("x-current-search-params") || ""
  );

  const { valid, searchParams } = await validateFilterParams(
    headerSearchParams
  );

  if (!valid) {
    redirect(`/players?${searchParams}`);
  }

  const filters = generateFiltersFromParams(searchParams);

  const activeTab =
    searchParams.get("tab")?.trim().toLowerCase() === "chart"
      ? "chart"
      : "table";

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="mb-12 hidden lg:block">
        <BreadCrumbs crumbs={[{ label: "Players", href: "/players" }]} />
      </div>

      <div className="flex justify-between gap-8 items-baseline w-full relative">
        <h1 className="font-bold text-3xl tracking-tight">Players</h1>
        <PlayersTabs />
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
      </div>
      <div className="my-8">
        <FilterGroup />
      </div>
      {activeTab === "chart" && (
        <div>
          <span>Chart Tab Active</span>
        </div>
      )}
      {activeTab === "table" && <PlayersTable filters={filters} />}
    </div>
  );
}
