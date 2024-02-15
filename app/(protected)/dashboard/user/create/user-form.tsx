'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Loader2, Trash, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/actions/register";
import { UserSchema } from "@/schemas";

import data from '@/data/colombia.json';
import { UserdefaultValue, UsersDto } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectSearch from "@/components/form/select-search";
import DatePicker from "@/components/form/date-picker";

interface UserFormProps {
    initialData: any | null;
}

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

    const defaultValues = initialData ? initialData : UserdefaultValue;

    const eps = [
        { label: "EMPRESAS PUBLICAS DE MEDELLIN SERVICIOS MEDICOS", item: "EMPRESAS PUBLICAS DE MEDELLIN SERVICIOS MEDICOS"},
        { label: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", item: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA"},
        { label: "COLMEDICA ENTIDAD PROMOTORA DE SALUD S.A.", item: "COLMEDICA ENTIDAD PROMOTORA DE SALUD S.A."},
        { label: "SALUD TOTAL S.A. EPS ARS", item: "SALUD TOTAL S.A. EPS ARS"},
        { label: "CAFESALUD EPS", item: "CAFESALUD EPS"},
        { label: "E.P.S. SANITAS S.A.", item: "E.P.S. SANITAS S.A."},
        { label: "INSTITUTO DE SEGUROS SOCIALES", item: "INSTITUTO DE SEGUROS SOCIALES"},
        { label: "COMPENSAR ENTIDAD PROMOTORA DE SALUD", item: "COMPENSAR ENTIDAD PROMOTORA DE SALUD"},
        { label: "CAJA DE COMPENSACION FAMILIAR COMFENALCO ANTIOQUIA", item: "CAJA DE COMPENSACION FAMILIAR COMFENALCO ANTIOQUIA"},
        { label: "COMPAÑIA SURAMERICANA DE SERVICIOS DE SALUD S.A. SUSALUD", item: "COMPAÑIA SURAMERICANA DE SERVICIOS DE SALUD S.A. SUSALUD"},
        { label: "COMFENALCO VALLE EPS", item: "COMFENALCO VALLE EPS"},
        { label: "SALUDCOOP EPS", item: "SALUDCOOP EPS"},
        { label: "HUMANA VIVIR S.A. EPS", item: "HUMANA VIVIR S.A. EPS"},
        { label: "SALUD COLPATRIA S.A.", item: "SALUD COLPATRIA S.A."},
        { label: "COOMEVA EPS S.A.", item: "COOMEVA EPS S.A."},
        { label: "E.P.S. FAMISANAR LTDA. CAFAM COLSUBSIDIO", item: "E.P.S. FAMISANAR LTDA. CAFAM COLSUBSIDIO"},
        { label: "SERVICIO OCCIDENTAL DE SALUD S.A. S.O.S.", item: "SERVICIO OCCIDENTAL DE SALUD S.A. S.O.S."},
        { label: "CRUZBLANCA S.A.", item: "CRUZBLANCA S.A."},
        { label: "SOLIDARIA DE SALUD SOLSALUD S.A.", item: "SOLIDARIA DE SALUD SOLSALUD S.A."},
        { label: "SALUDVIDA S.A. EPS", item: "SALUDVIDA S.A. EPS"},
        { label: "SALUDCOLOMBIA EPS S.A.", item: "SALUDCOLOMBIA EPS S.A."},
        { label: "REDSALUD ATENCION HUMANA EPS S.A.", item: "REDSALUD ATENCION HUMANA EPS S.A."},
        { label: "Nueva Promotora de Salud - Nueva EPS", item: "Nueva Promotora de Salud - Nueva EPS"},
        { label: "FONDO DE SOLIDARIDAD Y GARANTIA-FOSYGA-MINISTERIO DE SALDU", item: "FONDO DE SOLIDARIDAD Y GARANTIA-FOSYGA-MINISTERIO DE SALDU"},
    ] as const

    const compensationBox = [
        { label: "Colpensiones", item: "Colpensiones"},
        { label: "caja de compensacion1", item: "caja de compensacion1"},
        { label: "caja de compensacion2", item: "caja de compensacion2"},
        { label: "caja de compensacion3", item: "caja de compensacion3"}
    ]

    const healt = [
        { label: "Salud total", item: "Salud total"},
        { label: "salud 1", item: "salud 1"},
        { label: "salud 2", item: "salud 2"},
        { label: "salud 3", item: "salud 3"}
    ] as const

    const arl = [
        { label: "ARL 1", item: "ARL 1"},
        { label: "ARL 2", item: "ARL 2"},
        { label: "ARL 3", item: "ARL 3"},
        { label: "ARL 4", item: "ARL 4"}
    ] as const

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
                        </TabsList>
                        <Separator className="my-3" />
                        <TabsContent value="personal" className="m-0">
                            <div className="md:grid md:grid-cols-4 gap-8">
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
                                    name="userDetails.firstName"
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
                                    name="userDetails.lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Apellido"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userDetails.identification"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Identificación</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Identificación"
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

                                <FormField
                                    control={form.control}
                                    name="userDetails.age"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Edad</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="edad"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="userDetails.ocupation"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Ocupación</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Ocupación"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="userDetails.salary"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Salario</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Salario"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="address" className="m-0">
                            <div className="md:grid md:grid-cols-4 gap-8">
                                <FormField
                                    control={form.control}
                                    name="address.department"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Departamento</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Departamento"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address.city"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Municipio</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Municipio"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address.neighborhood"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Barrio</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Barrio"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address.address"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Dirección</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Dirección"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phones.homephone"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Teléfono de casa</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Telefono de casa"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phones.cellphone"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Celular</FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={loading}
                                            placeholder="Celular"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="affiliate" className="m-0">
                            <div className="md:grid md:grid-cols-4 gap-8">
                                <FormField
                                    control={form.control}
                                    name="affiliate.typeContributorId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de cotizante</FormLabel>
                                            <FormControl>
                                                <Input
                                                disabled={loading}
                                                placeholder="Tipo de cotizante"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="affiliate.eps"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>EPSS</FormLabel>
                                            <FormControl className="truncate">
                                                <SelectSearch {...field} form={form} values={eps} nameValue="affiliate.eps" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="affiliate.arl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ARL</FormLabel>
                                            <FormControl className="truncate">
                                                <SelectSearch {...field} form={form} values={arl} nameValue="affiliate.arl" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="affiliate.healt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ARL</FormLabel>
                                            <FormControl className="truncate">
                                                <SelectSearch {...field} form={form} values={healt} nameValue="affiliate.healt" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="affiliate.compensationBox"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Caja de compensación</FormLabel>
                                            <FormControl className="truncate">
                                                <SelectSearch {...field} form={form} values={compensationBox} nameValue="affiliate.compensationBox" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="affiliate.admissionDate"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Fecha de ingreso</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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