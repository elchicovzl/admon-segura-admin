import BreadCrumb from "@/components/breadcrumb";
import { users } from "@/constants/data";

const breadcrumbItems = [{ title: "Afiliados", link: "/dashboard/affiliate" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
      </div>
    </>
  );
}