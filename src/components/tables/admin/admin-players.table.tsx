import { getAdminPlayersTableData } from "@/db/queries/get-admin-players-table-data";
import { AdminPlayersTableBuilder } from "./admin-players-table-builder";

export type AdminPlayersTableData = Awaited<
  ReturnType<typeof getAdminPlayersTableData>
>[0];

export async function AdminPlayersTable() {
  const adminPlayersTableData = await getAdminPlayersTableData();

  if (adminPlayersTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-16 border rounded p-4">
        <span>Seems like no players have been created yet.</span>
      </div>
    );
  }

  return <AdminPlayersTableBuilder data={adminPlayersTableData} />;
}
