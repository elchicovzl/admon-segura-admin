'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Loader2, Trash, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { register } from "@/actions/register";
import { UserSchema } from "@/schemas";

import data from '@/data/colombia.json';
import { UserdefaultValue, UsersDto } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalPartial from "@/app/(protected)/dashboard/user/_components/_form/personal-partial";
import AddressPartial from "@/app/(protected)/dashboard/user/_components/_form/address-partial";
import AffiliatePartial from "../_components/_form/affiliate-partial";
import DocumentsPartial from "../_components/_form/documents-partial";
import BeneficiariesPartial from "../_components/_form/beneficiaries-partial";
import { toast } from "@/components/ui/use-toast";

export interface PartialFormType  {
    form : UseFormReturn,
    loading: boolean,
    edit: boolean
}
interface UserFormProps {
    initialData: any | null;
}

export const UserForm: React.FC<UserFormProps> = ({
    initialData
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const title = initialData ? "Editar usuario" : "Crear usuario";
    const description = initialData ? "Editar a usuario." : "Agregar un nuevo usuario";
    const toastMessage = initialData ? "User updated." : "User created.";
    const action = initialData ? "Guardar cambios" : "Crear";

    const defaultValues = initialData ? initialData : UserdefaultValue;

    console.log(defaultValues)

    const form= useForm<UsersDto>({
        resolver: zodResolver(UserSchema),
        defaultValues,
    });

    const [personalErr, setPersonalErr] = useState(0);

    useEffect(() => {
        if (Object.keys(form.formState.errors).length > 0) {
            setPersonalErr(Object.keys(form.formState.errors).length);
        }else {
            setPersonalErr(0);
        }

    }, [form.formState, setPersonalErr]);

    const onSubmit = async (values: UsersDto) => {
        setLoading(true);
        console.log(values);
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
                        setLoading(false);
                    }

                    if (data.success) {
                        toast({
                            variant: "default",
                            title: "Registro exitoso.",
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

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <Tabs defaultValue="personal">
                        <TabsList className="ml-auto">
                            <TabsTrigger value="personal" className="text-zinc-600 dark:text-zinc-200">Datos Personales  {(personalErr > 0) && (<span className="text-red-400 ml-3 flex items-center text-[12px]"><AlertTriangle className="w-[12px]" /> {personalErr}</span>)} </TabsTrigger>
                            <TabsTrigger value="address" className="text-zinc-600 dark:text-zinc-200">Dirección & Telefonos</TabsTrigger>
                            <TabsTrigger value="affiliate" className="text-zinc-600 dark:text-zinc-200">Afiliación</TabsTrigger>
                            <TabsTrigger value="documents" className="text-zinc-600 dark:text-zinc-200">Documentos</TabsTrigger>
                            <TabsTrigger value="beneficiaries" className="text-zinc-600 dark:text-zinc-200">Beneficiarios</TabsTrigger>
                        </TabsList>
                        <Separator className="my-3" />
                        <TabsContent value="personal" className="m-0">
                            <PersonalPartial form={form} loading={loading} edit={initialData ? true : false} />
                        </TabsContent>
                        <TabsContent value="address" className="m-0">
                            <AddressPartial form={form} loading={loading} edit={initialData ? true : false} />
                        </TabsContent>
                        <TabsContent value="affiliate" className="m-0">
                            <AffiliatePartial form={form} loading={loading} edit={initialData ? true : false} />
                        </TabsContent>
                        <TabsContent value="documents" className="m-0">
                            <DocumentsPartial form={form} loading={loading} edit={initialData ? true : false} />
                        </TabsContent>
                        <TabsContent value="beneficiaries" className="m-0">
                            <BeneficiariesPartial form={form} loading={loading} edit={initialData ? true : false} />
                        </TabsContent>
                    </Tabs>
                
                <Button disabled={loading} className="ml-auto" type="submit">
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {action}
                </Button>
                </form>
            </Form>
        </div>
    );
}