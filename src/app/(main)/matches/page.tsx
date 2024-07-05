import { BreadCrumbs } from "@/components/breadcrumbs/bread-crumbs";
import { FilterGroup } from "@/components/filters/filter-group";
import { MatchesHeader } from "@/components/matches-header";
import { MatchesTable } from "@/components/tables/matches/matches-table";
import { generateFiltersFromParams } from "@/utils/generate-filters-from-params";
import { validateFilterParams } from "@/utils/validate-filter-params";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MatchesPage() {
  const headerSearchParams = new URLSearchParams(
    headers().get("x-current-search-params") || ""
  );

  const { valid, searchParams } = await validateFilterParams(
    headerSearchParams
  );

  if (!valid) {
    redirect(`/matches?${searchParams}`);
  }

  const filters = generateFiltersFromParams(searchParams);

  const activeTab =
    searchParams.get("tab")?.trim().toLowerCase() === "chart"
      ? "chart"
      : "table";

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="mb-12 hidden lg:block">
        <BreadCrumbs crumbs={[{ label: "Matches", href: "/matches" }]} />
      </div>

      <MatchesHeader />

      <div className="my-8">
        <FilterGroup />
      </div>

      {activeTab === "chart" && (
        <div>
          <span>Chart Tab Active</span>
        </div>
      )}

      {activeTab === "table" && <MatchesTable filters={filters} />}
    </div>
  );
}
