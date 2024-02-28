import React from 'react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { PartialFormType } from '../../create/user-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const PersonalPartial: React.FC<PartialFormType> = ({
    form,
    loading,
    edit
}) => {
  return (
    <Card className="">
        <CardHeader><CardTitle className="flex items-center gap-2"> <User /> Datos personales del nuevo usuario.</CardTitle></CardHeader>
        <CardContent>
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
                    name="userDetail.firstName"
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
                    name="userDetail.lastname"
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
                    name="userDetail.identification"
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
                    name="userDetail.age"
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
                    name="userDetail.ocupation"
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
                    name="userDetail.salary"
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
    </CardContent>
    </Card>

  )
}

export default PersonalPartial;