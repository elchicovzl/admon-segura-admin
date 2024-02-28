import { getUser } from "@/actions/get-user";
import BreadCrumb from "@/components/breadcrumb";
import { currentUser } from "@/lib/auth";
import { EditUserDto, UsersDto } from "@/types";
import { redirect } from "next/navigation";
import { UserForm } from "../create/user-form";

const breadcrumbItems = [
    { title: "Usuarios", link: "/dashboard/user" },
    { title: "", link: "" }
];

const UserEditPage = async ({
    params
}: {params: { userId: string }}) => {


    const initialData:EditUserDto = await getUser({userId: params.userId});

    const { userDetail } = initialData;

    console.log("user details:", userDetail);

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