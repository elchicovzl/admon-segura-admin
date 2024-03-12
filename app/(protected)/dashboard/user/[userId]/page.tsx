import { getUser } from "@/actions/get-user";
import BreadCrumb from "@/components/breadcrumb";
import { currentUser } from "@/lib/auth";
import { EditUserDto, UsersDto } from "@/types";
import { redirect } from "next/navigation";
import { UserForm } from "../create/user-form";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Label } from "@/components/ui/label";

const breadcrumbItems = [
    { title: "Usuarios", link: "/dashboard/user" },
    { title: "", link: "" }
];

const UserEditPage = async ({
    params
}: {params: { userId: string }}) => {


    const initialData:EditUserDto = await getUser({userId: params.userId});
    console.log(initialData)
    const { userDetail } = initialData;

    breadcrumbItems[1].title = `${userDetail?.firstName} ${userDetail?.lastname}`;
    breadcrumbItems[1].link = `/dashboard/user/${initialData.id}`;
        
    return ( 
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
            </div>
            <UserForm initialData={initialData} />
        </>
    );
}
 
export default UserEditPage;