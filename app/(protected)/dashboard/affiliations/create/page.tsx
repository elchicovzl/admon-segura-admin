import BreadCrumb from "@/components/breadcrumb";
import { AffiliateForm } from "../_components/_form/affiliation-form";
import { getUsersSelect } from "@/actions/get-user";
import { getTypeContributors } from "@/actions/settings";

interface formProps {
    initialData: any | null;
}

const breadcrumbItems = [
    { title: "Afiliaciones", link: "dashboard/affiliations" },
    { title: "Crear usuario", link: "/dashboard/user/create" }
];

export default async function page() {
    const users = await getUsersSelect();
    const typeContributors = await getTypeContributors();

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
            </div>
            <AffiliateForm 
                initialData={""}
                users={JSON.parse(JSON.stringify(users))}
                typeContributors={JSON.parse(JSON.stringify(typeContributors))}
            />
        </>
    )
}