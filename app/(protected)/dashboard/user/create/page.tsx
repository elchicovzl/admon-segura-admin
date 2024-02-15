import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "./user-form";

interface UserFormProps {
    initialData: any | null;
}

const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    { title: "Create user", link: "/dashboard/user/create" }
];

export default async function page() {
    return (
        <>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
        </div>
        <UserForm initialData={""} />
        </>
    )
}