import { z } from "zod";
import {
  VALID_LOCATION_PARAMS,
  VALID_RESULT_PARAMS,
  VALID_SOURCE_PARAMS,
} from "@/constants";
import {
  validateCompetitionParam,
  validateSeasonParam,
} from "./utils/param-validators";

export const filterParamsSchema = z.object({
  source: z.union([z.enum(VALID_SOURCE_PARAMS), z.undefined()]),
  result: z.union([
    z.enum(VALID_RESULT_PARAMS),
    z.array(z.enum(VALID_RESULT_PARAMS)),
    z.undefined(),
  ]),
  location: z.union([
    z.enum(VALID_LOCATION_PARAMS),
    z.array(z.enum(VALID_LOCATION_PARAMS)),
    z.undefined(),
  ]),
  season: z.union(
    [
      z
        .string()
        .refine(validateSeasonParam, { message: "Invalid season period." }),
      z.undefined(),
    ],
    { message: "You can't pass multiple season params." }
  ),
  competition: z.union([
    z.string().refine(validateCompetitionParam),
    z.undefined(),
  ]),
});
