import { getAdminClubsTableData } from "@/db/queries/get-admin-clubs-table-data";
import { AdminClubsTableBuilder } from "./admin-clubs-table-builder";

export type AdminClubsTableData = Awaited<
  ReturnType<typeof getAdminClubsTableData>
>[0];

export async function AdminClubsTable() {
  const adminClubsTableData = await getAdminClubsTableData();

  if (adminClubsTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-16 border rounded p-4">
        <span>Seems like no clubs have been created yet.</span>
      </div>
    );
  }

  return <AdminClubsTableBuilder data={adminClubsTableData} />;
}
