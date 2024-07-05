"use server";

import prisma from "@/libs/prisma";
import { ClubFormSchemaType, clubFormSchema } from "@/schemas/club-form-schema";
import { ServerActionReturnType } from "@/types/actions";
import { revalidatePath } from "next/cache";

export async function editClubAction(
  id: string,
  form: ClubFormSchemaType
): Promise<ServerActionReturnType> {
  const { success, data, error } = clubFormSchema.safeParse(form);

  if (!success) {
    return {
      success: false,
      message: "Validation Error",
      errors: [...error.issues.map((issue) => issue.message)],
    };
  }

  try {
    await prisma.club.update({
      where: { id: id },
      data: {
        full_name: data.full_name,
        name_code: data.name_code,
        country_code: data.country_code,
        primary_color: data.primary_color,
        secondary_color: data.secondary_color,
        logo_url: data.logo_url,
      },
    });
  } catch (err: any) {
    return {
      success: false,
      message: "Server Error",
      errors: [err.message],
    };
  }
  revalidatePath("/");
  return {
    success: true,
    message: `Club ${data.full_name} updated!`,
  };
}
