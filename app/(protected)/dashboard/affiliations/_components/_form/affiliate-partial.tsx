import React, { useState } from 'react'
import { PartialFormType } from '../../../user/create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectSearch from '@/components/form/select-search';
import DatePicker from '@/components/form/date-picker';
import { arl, compensationBox, eps, healt, process as processList } from '@/constants/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck } from 'lucide-react';
import { DataTable } from '../../../user/[userId]/_components/data-table';
import { columns } from '../../../user/[userId]/_components/columns';
import { Separator } from '@/components/ui/separator';
import { getUsersSelect } from '@/actions/get-user';

const AffiliatePartial: React.FC<PartialFormType> = ({
    form,
    loading,
    edit,
    affiliates,
    users,
    typeContributors
}) => {

    const [process, setProcess] = useState(edit ? form.getValues('process') : "AFILIACION");
    const [userId, setUserId] = useState(edit ? form.getValues('userId') : "");
    const [typeContributor, setTypeContributor] = useState(edit ? form.getValues('typeContributorId'): "");

    const changeProcess = (value:string) => {
        setProcess(value)
    }
    const changeUserSelect = (value:string) => {
        setUserId(value);
    }
    const changeTypeContributor = (value:string) => {
        setTypeContributor(value);
    }

  return (
    <>
        <div className="md:grid md:grid-cols-4 gap-8 pb-5  pt-5">
            <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Seleccion el proceso</FormLabel>
                        <FormControl>
                        <SelectSearch {...field} form={form} values={users} nameValue="userId" onChangeProcess={changeUserSelect} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="process"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Seleccion el proceso</FormLabel>
                        <FormControl>
                        <SelectSearch {...field} form={form} values={processList} nameValue="process" onChangeProcess={changeProcess} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        {process == "AFILIACION" &&
            <Card className="">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpenCheck /> Datos de afiliación.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    
                    <div className="md:grid md:grid-cols-4 gap-8 pb-5">
                        <FormField
                            control={form.control}
                            name="typeContributorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de cotizante</FormLabel>
                                    <FormControl>
                                    <SelectSearch {...field} form={form} values={typeContributors} nameValue="typeContributorId" onChangeProcess={changeTypeContributor} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="eps"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>EPSS</FormLabel>
                                    <FormControl className="truncate">
                                        <SelectSearch {...field} form={form} values={eps} nameValue="eps" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="arl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ARL</FormLabel>
                                    <FormControl className="truncate">
                                        <SelectSearch {...field} form={form} values={arl} nameValue="arl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="healt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ARL</FormLabel>
                                    <FormControl className="truncate">
                                        <SelectSearch {...field} form={form} values={healt} nameValue="healt" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="compensationBox"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Caja de compensación</FormLabel>
                                    <FormControl className="truncate">
                                        <SelectSearch {...field} form={form} values={compensationBox} nameValue="compensationBox" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="admissionDate"
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
                        <FormField
                            control={form.control}
                            name="salary"
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
                    <Separator className="my-5" />
                    <DataTable columns={columns} data={affiliates} />
                </CardContent>
            </Card>
        }

        {process == "INCAPACIDAD" &&
            <Card className="">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpenCheck /> Datos de Incapacidad del nuevo usuario.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Formulario de Incapacidad.</p>
                </CardContent>
            </Card>
        }
    </>
  )
}

export default AffiliatePartial;