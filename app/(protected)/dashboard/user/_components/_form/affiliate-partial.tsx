import React from 'react'
import { PartialFormType } from '../../create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectSearch from '@/components/form/select-search';
import DatePicker from '@/components/form/date-picker';
import { arl, compensationBox, eps, healt } from '@/constants/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck } from 'lucide-react';

const AffiliatePartial: React.FC<PartialFormType> = ({
    form,
    loading
}) => {
  return (
    <Card className="">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookOpenCheck /> Datos de afiliación del nuevo usuario.</CardTitle></CardHeader>
        <CardContent>   
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
        </CardContent>
    </Card>
  )
}

export default AffiliatePartial;