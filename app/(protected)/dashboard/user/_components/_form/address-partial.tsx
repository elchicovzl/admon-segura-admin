import React from 'react'
import { PartialFormType } from '../../create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser } from 'lucide-react';

const AddressPartial: React.FC<PartialFormType> = ({
    form,
    loading,
    edit
}) => {
  return (
    <Card className="">
        <CardHeader><CardTitle className="flex items-center gap-2"><BookUser />Datos de dirección y números telefónicos del nuevo usuario.</CardTitle></CardHeader>
        <CardContent>
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
        </CardContent>
    </Card>
  )
}

export default AddressPartial;