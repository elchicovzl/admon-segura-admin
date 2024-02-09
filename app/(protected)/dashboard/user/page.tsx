import BreadCrumb from "@/components/breadcrumb";
import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default async function page() {

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="p-6">
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
}