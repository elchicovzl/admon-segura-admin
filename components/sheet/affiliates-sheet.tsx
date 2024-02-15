'use client'
import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useSheetAffiliateStore } from '@/store/store';
import { Card, CardContent } from '../ui/card';


const AffiliatesSheet = () => {

  const {isOpen, setIsOpen, execute, loading, data, userId} = useSheetAffiliateStore();

  useEffect(() => {
    execute(userId);
  }, [userId]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetContent className="w-[800px] sm:min-w-[700px] max-w-[750px] sm:w-[750px]">
            <SheetHeader className='w-full'>
                <SheetTitle>Afiliaciones</SheetTitle>
                <SheetDescription>
                  Listado de últimas afiliaciones.
                </SheetDescription>
            </SheetHeader>

            <div>
            {loading ? (<p>Loading...</p>) :
              (
                <>
                {data?.map(({ id, healt, eps, arl, admissionDate }) => 
                  (
                    <Card className='my-3 p-0' >
                      <CardContent className='flex flex-wrap gap-3 items-center py-2 ' >
                          <div className='block '>
                            <strong className='block text-xs'>EPS:</strong>
                            <span className='block '>{eps}</span> 
                          </div>
                          <div>
                            <strong className='block text-xs'>Salud</strong>
                            <span className='block '>{healt}</span> 
                          </div>
                          <div>
                            <strong className='block text-xs'>ARL</strong>
                            <span className='block '>{arl}</span> 
                          </div>
                          <div className='block '>
                            <strong className='block text-xs'>Fecha admisión:</strong>
                            <span className='block '>{admissionDate}</span> 
                          </div>
                          <div className='block '>
                            <strong className='block text-xs'>Estatus:</strong>
                            <span className='block '>Pendiente</span> 
                          </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )
            }
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default AffiliatesSheet;