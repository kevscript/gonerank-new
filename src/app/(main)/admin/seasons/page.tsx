import { AdminPlayersTable } from "@/components/tables/admin/admin-players.table";
import { AdminSeasonsTable } from "@/components/tables/admin/admin-seasons-table";
import Button from "@/components/ui/button";

export default async function AdminSeasonsPage() {
  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="flex justify-between gap-8 items-baseline w-full relative mb-12 pb-4">
        <h1 className="font-bold text-3xl tracking-tight">Admin Seasons</h1>
        <div>
          <Button>New Season</Button>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
      </div>
      <AdminSeasonsTable />
    </div>
  );
}
