import BreadCrumb from "@/components/breadcrumb";
import { AffiliateForm } from "../_components/_form/affiliation-form";

interface formProps {
    initialData: any | null;
}

const breadcrumbItems = [
    { title: "Afiliaciones", link: "dashboard/affiliations" },
    { title: "Crear usuario", link: "/dashboard/user/create" }
];

export default async function page() {
    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
            </div>
            <AffiliateForm initialData={""} />
        </>
    )
}