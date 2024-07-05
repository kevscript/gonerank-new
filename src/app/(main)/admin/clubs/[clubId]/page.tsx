import { ClubForm } from "@/components/forms/club-form";
import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export default async function AdminClubEditPage({
  params,
}: {
  params: { clubId: string };
}) {
  let club;

  try {
    club = await prisma.club.findUnique({ where: { id: params.clubId } });
  } catch (err: any) {
    notFound();
  }

  if (!club) {
    notFound();
  }

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <h1>Admin Club Edit Page</h1>

      <ClubForm club={club} />
      <pre>{JSON.stringify(club, null, 2)}</pre>
    </div>
  );
}
