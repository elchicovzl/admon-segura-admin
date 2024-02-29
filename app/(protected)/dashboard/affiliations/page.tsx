import BreadCrumb from "@/components/breadcrumb";
import { users } from "@/constants/data";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const breadcrumbItems = [{ title: "Afiliaciones", link: "/dashboard/affiliations" }];

export default async function page() {

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

  const affiliations = await xprisma.affiliate.findMany({
    include: {
      user: {
        include: {
          userDetail: true
        }
      },
      beneficiaries: true,
      typeContributor: true
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
        <DataTable columns={columns} data={JSON.parse(JSON.stringify(affiliations))} />
      </div>
    </>
  );
}