import { getAdminCompetitionsTableData } from "@/db/queries/get-admin-competitions-table-data";
import { AdminCompetitionsTableBuilder } from "./admin-competitions-table-builder";

export type AdminCompetitionsTableData = Awaited<
  ReturnType<typeof getAdminCompetitionsTableData>
>[0];

export async function AdminCompetitionsTable() {
  const adminCompetitionsTableData = await getAdminCompetitionsTableData();

  if (adminCompetitionsTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-16 border rounded p-4">
        <span>Seems like no competitions have been created yet.</span>
      </div>
    );
  }

  return <AdminCompetitionsTableBuilder data={adminCompetitionsTableData} />;
}
