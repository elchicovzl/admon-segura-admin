"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";

type UserFormValues = z.infer<typeof RegisterSchema>;

interface UserFormProps {
    initialData: any | null;
}

const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    { title: "Create user", link: "/dashboard/user/create" }
];

export const UserForm: React.FC<UserFormProps> = ({
    initialData
}) => {
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const title = initialData ? "Editar usuario" : "Crear usuario";
    const description = initialData ? "Editar a usuario." : "Agregar un nuevo usuario";
    const toastMessage = initialData ? "User updated." : "User created.";
    const action = initialData ? "Guardar cambios" : "Crear";

    const defaultValues = initialData
    ? initialData
    : {
        name: "",
        email: "",
    };

    const form = useForm<UserFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues,
    });
    const onSubmit = async (values: UserFormValues) => {
        setLoading(true);
       
        if (initialData) {
                //await axios.post(`/api/users/${initialData._id}/edit`, data);
        } else {
            startTransition(() => {
                register(values)
                    .then((data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            title: "Hubo un problema.",
                            description: data.error,
                        });
                    }

                    if (data.success) {
                        toast({
                            variant: "default",
                            title: "Success.",
                            description: data.success,
                        });
                        router.refresh();
                        router.push(`/dashboard/user`);
                    }
                    setLoading(false);
                });
            });
        }
    };

    return (
        <>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                <div className="md:grid md:grid-cols-4 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                disabled={loading}
                                placeholder="Nombre"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                disabled={loading}
                                placeholder="Email"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                disabled={loading}
                                placeholder="*******"
                                type="password"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {action}
                </Button>
                </form>
            </Form>


        </div>
        </>
    )
}

export default UserForm;