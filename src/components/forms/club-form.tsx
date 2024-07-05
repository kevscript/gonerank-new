"use client";

import { ClubFormSchemaType, clubFormSchema } from "@/schemas/club-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import { createClubAction } from "@/actions/create-club-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Club } from "@prisma/client";
import { editClubAction } from "@/actions/edit-club-action";

export function ClubForm({ club }: { club?: Club }) {
  const router = useRouter();

  const buttonText = club ? "Edit Club" : "Create Club";
  const buttonSubmitText = club ? "Editing..." : "Creating...";

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid, errors, isDirty },
  } = useForm<ClubFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      country_code: club?.country_code ?? "",
      full_name: club?.full_name ?? "",
      name_code: club?.name_code ?? "",
      primary_color: club?.primary_color ?? "",
      secondary_color: club?.secondary_color ?? "",
      logo_url: club?.logo_url ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = club
      ? await editClubAction(club.id, data)
      : await createClubAction(data);

    if (!response.success) {
      toast.error(`${response.message}: ${response.errors?.join(" / ")}`);
    } else {
      toast.info(`${response.message}`);
      router.push("/admin/clubs");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="rounded p-8 max-w-[64rem] flex flex-col gap-8 border"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="full_name" className="text-sm">
          Full name
        </label>
        <input
          id="full_name"
          {...register("full_name")}
          className="border h-10 max-w-96 px-2 rounded bg-neutral-50"
        />
        {errors.full_name && (
          <p className="text-red-600 text-sm">{errors.full_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name_code" className="text-sm">
          Name code
        </label>
        <input
          id="name_code"
          {...register("name_code")}
          className="border h-10 max-w-96 px-2 rounded bg-neutral-50"
        />
        {errors.name_code && (
          <p className="text-red-600 text-sm">{errors.name_code.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="country_code" className="text-sm">
          Country code
        </label>
        <input
          id="country_code"
          {...register("country_code")}
          className="border h-10 max-w-96 px-2 rounded bg-neutral-50"
        />
        {errors.country_code && (
          <p className="text-red-600 text-sm">{errors.country_code.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="primary_color" className="text-sm">
          Primary color
        </label>
        <input
          id="primary_color"
          {...register("primary_color")}
          className="border h-10 max-w-96 px-2 rounded bg-neutral-50"
        />
        {errors.primary_color && (
          <p className="text-red-600 text-sm">{errors.primary_color.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="secondary_color" className="text-sm">
          Secondary color
        </label>
        <input
          id="secondary_color"
          {...register("secondary_color")}
          className="border h-10 max-w-96 px-2 rounded bg-neutral-50"
        />
        {errors.secondary_color && (
          <p className="text-red-600 text-sm">
            {errors.secondary_color.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="logo_url" className="text-sm">
          Logo url
        </label>
        <input
          id="logo_url"
          {...register("logo_url")}
          className="border h-10 max-w-96 px-2 rounded bg-neutral-50"
        />
        {errors.logo_url && (
          <p className="text-red-600 text-sm">{errors.logo_url.message}</p>
        )}
      </div>

      <div className="flex gap-4 mt-4 flex-col md:flex-row">
        <Button disabled={isSubmitting || !isValid || !isDirty} type="submit">
          {isSubmitting ? buttonSubmitText : buttonText}
        </Button>

        <Button
          disabled={isSubmitting}
          onClick={() => reset()}
          type="button"
          variant="secondary"
        >
          Reset
        </Button>

        <button type="button" onClick={() => toast("Hello??")}>
          Toast
        </button>
      </div>
    </form>
  );
}
