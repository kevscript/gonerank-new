import { getAdminMatchesTableData } from "@/db/queries/get-admin-matches-table-data";
import { AdminMatchesTableBuilder } from "./admin-matches-table-builder";

export type AdminMatchesTableData = Awaited<
  ReturnType<typeof getAdminMatchesTableData>
>[0];

export async function AdminMatchesTable() {
  const adminMatchesTableData = await getAdminMatchesTableData();

  if (adminMatchesTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-16 border rounded p-4">
        <span>Seems like no matches have been created yet.</span>
      </div>
    );
  }

  return <AdminMatchesTableBuilder data={adminMatchesTableData} />;
}
