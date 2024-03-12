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
import { register } from "@/actions/register";
import { AffiliateSchema, UserSchema } from "@/schemas";

import { AffiliateDto, UserdefaultValue, UsersDto } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AffiliatePartial from "./affiliate-partial"; 
import BeneficiariesPartial from "./beneficiaries-partial";
import { toast } from "@/components/ui/use-toast";

export interface PartialFormType  {
    form : UseFormReturn,
    loading: boolean,
    edit: boolean,
    affiliates: [],
    users: ISelect[],
    typeContributors: ISelect[]
}

export interface ISelect {
    item: String,
    label: String
}
interface UserFormProps {
    initialData: any | null;
    users: ISelect[],
    typeContributors: ISelect[]
}

export const AffiliateForm: React.FC<UserFormProps> = ({
    initialData,
    users,
    typeContributors
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const title = initialData ? "Editar afiliación" : "Crear afiliación";
    const description = initialData ? "Editar a afiliación." : "Agregar una nueva afiliación";
    const toastMessage = initialData ? "Afiliación actualizada." : "Afiliación creada.";
    const action = initialData ? "Guardar cambios" : "Crear";

    const defaultValues = initialData ? initialData : UserdefaultValue;

    const form= useForm<AffiliateDto>({
        resolver: zodResolver(AffiliateSchema),
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

    const onSubmit = async (values: AffiliateDto) => {
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
                        setLoading(false);
                    }

                    if (data.success) {
                        toast({
                            variant: "default",
                            title: "Registro exitoso.",
                            description: data.success,
                        });
                        router.refresh();
                        router.push(`/dashboard/affiliate`);
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
                    <Tabs defaultValue="affiliate">
                        <TabsList className="ml-auto">
                            <TabsTrigger value="affiliate" className="text-zinc-600 dark:text-zinc-200">Procesos</TabsTrigger>
                            <TabsTrigger value="beneficiaries" className="text-zinc-600 dark:text-zinc-200">Beneficiarios</TabsTrigger>
                        </TabsList>
                        <Separator className="my-3" />
                        <TabsContent value="affiliate" className="m-0">
                            <AffiliatePartial 
                                form={form} 
                                users={users} 
                                loading={loading} 
                                edit={initialData ? true : false} 
                                affiliates={initialData.affiliate || []}
                                typeContributors={typeContributors}
                            />
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