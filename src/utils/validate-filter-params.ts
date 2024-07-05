import { filterParamsSchema } from "@/schemas/filters-schema";

type ValidParamsReturnType = {
  valid: true;
  searchParams: URLSearchParams;
  invalidatedParams: undefined;
};

type InvalidParamsReturnType = {
  valid: false;
  searchParams: URLSearchParams;
  invalidatedParams: Array<string>;
};

/**
 * This function accepts URLSearchParams and validates the filter params with Zod.
 * If the validation is unsuccessful it will remove faulty filters from the URLSearchParams.
 * If the filter values are all valid, it will return the URLSearchParams in their original state.
 */
export async function validateFilterParams(
  searchParams: URLSearchParams
): Promise<ValidParamsReturnType | InvalidParamsReturnType> {
  const validateFilterParams = await filterParamsSchema.safeParseAsync({
    source: searchParams?.get("source") || undefined,
    location: searchParams?.getAll("location") || undefined,
    result: searchParams.getAll("result") || undefined,
    season: searchParams.get("season") || undefined,
    competition: searchParams.get("competition") || undefined,
  });

  if (!validateFilterParams.success) {
    const invalidatedParams: Array<string> = [];

    const errors = validateFilterParams.error.format();
    for (const errorName in errors) {
      if (errorName !== "_errors") invalidatedParams.push(errorName);
    }
    errors.season && searchParams.delete("season");
    errors.competition && searchParams.delete("competition");
    errors.location && searchParams.delete("location");
    errors.result && searchParams.delete("result");
    errors.source && searchParams.delete("source");

    return { valid: false, searchParams, invalidatedParams };
  }

  return { valid: true, searchParams, invalidatedParams: undefined };
}
