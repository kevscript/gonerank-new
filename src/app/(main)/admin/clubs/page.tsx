import { AdminClubsTable } from "@/components/tables/admin/admin-clubs-table";
import Button from "@/components/ui/button";
import Link from "next/link";

export default async function AdminClubsPage() {
  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="flex justify-between gap-8 items-baseline w-full relative mb-12 pb-4">
        <h1 className="font-bold text-3xl tracking-tight">Admin Clubs</h1>
        <div>
          <Link href={"/admin/clubs/create"}>
            <Button>New Club</Button>
          </Link>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
      </div>
      <AdminClubsTable />
    </div>
  );
}
