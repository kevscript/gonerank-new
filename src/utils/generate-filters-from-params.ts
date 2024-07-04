import { Filters } from "@/types/filters";

/**
 * This functions accepts URLSearchParams and returns a filters object based on the searchParams filter values.
 */
export function generateFiltersFromParams(
  searchParams: URLSearchParams
): Filters {
  const location = searchParams.getAll("location");
  const result = searchParams.getAll("result");

  return {
    source: searchParams.get("source") || undefined,
    location: location.length ? location : undefined,
    result: result.length ? result : undefined,
    season: searchParams.get("season") || undefined,
    competition: searchParams.get("competition") || undefined,
  };
}
