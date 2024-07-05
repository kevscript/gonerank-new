import { getAdminSeasonsTableData } from "@/db/queries/get-admin-seasons-table-data";
import { AdminSeasonsTableBuilder } from "./admin-seasons-table-builder";

export type AdminSeasonsTableData = Awaited<
  ReturnType<typeof getAdminSeasonsTableData>
>[0];

export async function AdminSeasonsTable() {
  const adminSeasonsTableData = await getAdminSeasonsTableData();

  if (adminSeasonsTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-16 border rounded p-4">
        <span>Seems like no seasons have been created yet.</span>
      </div>
    );
  }

  return <AdminSeasonsTableBuilder data={adminSeasonsTableData} />;
}
