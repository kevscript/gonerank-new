import { z } from "zod";

export const clubFormSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  name_code: z.string().trim().min(2).max(10),
  country_code: z
    .string()
    .trim()
    .length(2, { message: "Country code must be 2 characters long." }),
  primary_color: z.string().trim().min(4),
  secondary_color: z.string().trim().min(4),
  logo_url: z.string().trim(),
});

export type ClubFormSchemaType = z.infer<typeof clubFormSchema>;
