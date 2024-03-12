import { unstable_noStore as noStore } from "next/cache";

import BreadCrumb from "@/components/breadcrumb";
import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const breadcrumbItems = [{ title: "Usuarios", link: "/dashboard/user" }];
export default async function page() {
  noStore();

  const xprisma = db.$extends({
    result: {
      userDetails: {
        fullname: {
          // the dependencies
          needs: { firstname: true, lastname: true },
          compute(userDetails) {
            // the computation logic
            return `${userDetails?.firstname} ${userDetails?.lastname}`;
          },
        },
      },
    },
  });

  const users = await xprisma.user.findMany({
    where: {
      role: "USER"
    },
    include: {
      userDetail: true,
    },
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
        <DataTable columns={columns} data={JSON.parse(JSON.stringify(users))} />
      </div>
    </>
  );
}