import { FilterGroup } from "@/components/filters/filter-group";
import { MatchesPageHeader } from "@/components/matches-page-header";
import { MatchesTable } from "@/components/tables/matches/matches-table";
import { filterParamsSchema } from "@/schemas";
import { Filters } from "@/types/filters";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MatchesPage() {
  const headerList = headers();
  const headerSearchParams = headerList.get("x-current-search-params");
  const searchParams = new URLSearchParams(headerSearchParams || "");

  const activeTab =
    searchParams.get("tab")?.trim().toLowerCase() === "chart"
      ? "chart"
      : "table";

  const validateFilterParams = await filterParamsSchema.safeParseAsync({
    source: searchParams?.get("source") || undefined,
    location: searchParams?.getAll("location") || undefined,
    result: searchParams.getAll("result") || undefined,
    season: searchParams.get("season") || undefined,
    competition: searchParams.get("competition") || undefined,
  });

  if (!validateFilterParams.success) {
    const errors = validateFilterParams.error.format();
    errors.season && searchParams.delete("season");
    errors.competition && searchParams.delete("competition");
    errors.location && searchParams.delete("location");
    errors.result && searchParams.delete("result");
    errors.source && searchParams.delete("source");
    redirect(`/matches?${searchParams}`);
  }

  const filters: Filters = {
    source: searchParams?.get("source") || undefined,
    location: searchParams?.getAll("location") || undefined,
    result: searchParams.getAll("result") || undefined,
    season: searchParams.get("season") || undefined,
    competition: searchParams.get("competition") || undefined,
  };

  return (
    <main className="p-12">
      <MatchesPageHeader />

      <div className="my-8">
        <FilterGroup />
      </div>

      {activeTab === "chart" && (
        <div>
          <span>Chart Tab Active</span>
        </div>
      )}

      {activeTab === "table" && <MatchesTable filters={filters} />}
    </main>
  );
}
