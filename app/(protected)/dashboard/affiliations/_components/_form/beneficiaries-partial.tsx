import React, { useEffect, useState } from 'react'
import axios from "axios";
import { PartialFormType } from '../../../user/create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, Trash2, Users, XCircle } from 'lucide-react';
import { UploadButton } from '@/utils/uploadthing';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type BeneficiaryType = {
  firstname: string,
  lastname: string,
  identification: string,
  relationship: string,
  documents: string[]
}

const initialBeneState = {
  firstname: "",
  lastname: "",
  identification: "",
  relationship: "",
  benedocuments: []
};

const BeneficiariesPartial: React.FC<PartialFormType> = ({
    form,
    loading,
    edit
}) => {

  const beneDocumentsData = (edit)? form.getValues('beneficiaries') : form.getValues('beneficiaries')
  const [{firstname, lastname, identification, relationship, benedocuments}, setState]  = useState(initialBeneState);
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryType[]>(form.getValues('beneficiaries'));
  const [imageDeleting, setImageDeleting] = useState(false);

  const clearState = () => {
    setState({ ...initialBeneState });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDeleteInput = (index:number) => {
    const newArray = [...beneficiaries];
    newArray.splice(index, 1);
    setBeneficiaries(newArray);
  };

  const handleAddInput = () => {

    setBeneficiaries([...beneficiaries, {
      firstname: firstname,
      lastname: lastname,
      identification: identification,
      relationship: relationship,
      documents: benedocuments
    }]);

    form.setValue('beneficiaries', [...beneficiaries, {
      firstname: firstname,
      lastname: lastname,
      identification: identification,
      relationship: relationship,
      documents: benedocuments
    }]);

    clearState()
  };

  const handleImageDelete = async (image: string, index: number, images: string[]) => {
    setImageDeleting(true);

    if (edit) {
      images = images.map((val, index) => {
          return val.source;
      });
    }

    const imageKey = image.substring(image.lastIndexOf('/') + 1);

    axios.post('/api/uploadthing/delete', {imageKey}).then((res) => {
        if (res.data.success) {
            images.splice(index, 1);
            setState(prevState => ({ ...prevState, ['benedocuments']: images }));
            form.setValue(`beneficiaries.${index}.documents`, images);
            toast({
                variant: "success",
                description: "Image Removed"
            });
        }
    }).catch(() => {
        toast({
            variant: "destructive",
            description: "Algo malo ocurrió"
        });
    }).finally(() => {
        setImageDeleting(false);
    });
}

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users /> Agregar Beneficiario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:grid md:grid-cols-5 gap-8" key={0}>
                <div className='md:grid md:grid-rows-1 gap-2'>
                    <Label>Nombre</Label>
                    <Input
                      name="firstname"
                      disabled={loading}
                      placeholder="Nombre"
                      type="text"
                      value={firstname}
                      onChange={onChange}
                    />
                </div>

                <div className='md:grid md:grid-rows-1 gap-2'>
                  <Label>Apellido</Label>
                  <Input
                      name="lastname"
                      disabled={loading}
                      placeholder="Apellido"
                      type="text"
                      value={lastname}
                      onChange={onChange}
                    />
                </div>
                
                <div className='md:grid md:grid-rows-1 gap-2'>
                  <Label>Identificación</Label>
                  <Input
                      name="identification"
                      disabled={loading}
                      placeholder="Identificación"
                      type="text"
                      value={identification}
                      onChange={onChange}
                  />
                </div>

                <div className='md:grid md:grid-rows-1 gap-2'>
                  <Label>Parentesco</Label>
                  <Input
                      name="relationship"
                      disabled={loading}
                      placeholder="Parentesco"
                      type="text"
                      value={relationship}
                      onChange={onChange}
                  />
                </div>
                <div className="md:grid md:grid-rows-1 col-span-4 gap-2 ">
                {benedocuments.length ? 
                        <div className="md:grid md:grid-cols-4 gap-4 border-2 
                        border-dashed border-primary/50 p-5">
                            {benedocuments.map((image, index) => (
                                <div className="relative w-full  min-h-[200px] mt-4 border-2 
                                ">
                                    <Image fill src={image} alt="otros" className="object-contain" />
                                    <Button onClick={() => handleImageDelete(image, index, benedocuments)} type="button" size="icon" variant="ghost" className="absolute right-[-4px] top-0">
                                        {imageDeleting ? <Loader2 /> : <XCircle /> }
                                    </Button>
                                </div>
                            ))}
                        </div> : 

                        <div className="flex flex-col items-center max-w-full p-12 border-2 
                        border-dashed border-primary/50 rounded mt-4">
                            <UploadButton
                                content={{button({ ready }) {
                                    if (ready) return <div>Elige archivos</div>;
                                
                                    return "Cargando...";
                                    }}}
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                let imgs:string[] = [];
                                res.map((image, key)=> {
                                    imgs.push(image.url);
                                });
                                setState(prevState => ({ ...prevState, ['benedocuments']: imgs }));
                                //form.setValue('benedocuments.documents', imgs);
                                toast({
                                    variant: 'success',
                                    description: 'Upload Complete'
                                });
                                }}
                                onUploadError={(error: Error) => {
                                // Do something with the error.
                                toast({
                                    variant: 'destructive',
                                    description: `ERROR! ${error.message}`
                                })
                                }}
                            />
                        </div>
                        }
                </div>
                <div className='md:grid md:grid-rows-1 gap-2'>
                  <div className="flex items-center gap-2">
                      <span className=" flex items-center gap-3 py-2.5 px-5 me-2 mb-2 text-sm font-medium
                       text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 
                      hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100  cursor-pointer" 
                      onClick={() => handleAddInput()}><PlusCircle />Agregar</span>
                  </div>
                </div>     
          </div>
        </CardContent>
      </Card>
        <Accordion type="single" collapsible className="w-full mt-5 space-y-3">
        {beneficiaries.map((item, index) => (
          <Card key={`card${index}`}>
            <AccordionItem value={`item-${index}`}>
            <CardHeader>
            <AccordionTrigger className="!py-3 !px-0 capitalize">
              <div className="flex items-center gap-3">
                <Users />
                {`${item.firstname} ${item.lastname}`}
              </div>
              
              </AccordionTrigger>
            </CardHeader>
            <CardContent className="!py-0 !px-6">
              <AccordionContent className="px-2">
              <div className="md:grid md:grid-cols-5 gap-8" key={index}>
              <div className="md:grid md:grid-rows-1 gap-2">
                <FormField
                    control={form.control}
                    name={`beneficiaries.${index}.firstname`}
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
              </div>

              <div className='md:grid md:grid-rows-1 gap-2'>
                <FormField
                      control={form.control}
                      name={`beneficiaries.${index}.lastname`}
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
              </div>
              
              <div className='md:grid md:grid-rows-1 gap-2'>
                <FormField
                      control={form.control}
                      name={`beneficiaries.${index}.identification`}
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
              </div>

              <div className='md:grid md:grid-rows-1 gap-2'>
                <FormField
                      control={form.control}
                      name={`beneficiaries.${index}.relationship`}
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Parentesco</FormLabel>
                          <FormControl>
                              <Input
                              disabled={loading}
                              placeholder="Parentesco"
                              {...field}
                              />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                  />
              </div>
              <div className="md:grid md:grid-rows-1 col-span-4 gap-2 ">
              {beneficiaries[index].documents.length ?
                <div className="md:grid md:grid-cols-4 gap-4 border-2 
                  border-dashed border-primary/50 p-5">
                      {beneficiaries[index].documents.map((doc, indexDoc) => (
                          <div key={`doc${index}${indexDoc}`} className="relative w-full  min-h-[200px] mt-4 border-2">
                              <Image fill src={edit? doc.source: doc} alt="otros" className="object-contain" />
                              <Button onClick={() => handleImageDelete(edit? doc.source: doc, indexDoc, beneficiaries[index].documents)} type="button" size="icon" variant="ghost" className="absolute right-[-4px] top-0">
                                  {imageDeleting ? <Loader2 /> : <XCircle /> }
                              </Button>
                          </div>
                      ))}
                  </div> 
                  
                  :

                  <div className="flex flex-col items-center max-w-full p-12 border-2 
                  border-dashed border-primary/50 rounded mt-4">
                      <UploadButton
                          content={{button({ ready }) {
                              if (ready) return <div>Elige archivos</div>;
                          
                              return "Cargando...";
                              }}}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                          let imgs:string[] = [];
                          res.map((image, key)=> {
                              imgs.push(image.url);
                          });
                          beneficiaries[index].documents.push(...imgs);
                          form.setValue(`beneficiaries.${index}.documents`, imgs);
                          clearState()
                          toast({
                              variant: 'success',
                              description: 'Upload Complete'
                          });
                          }}
                          onUploadError={(error: Error) => {
                          // Do something with the error.
                          toast({
                              variant: 'destructive',
                              description: `ERROR! ${error.message}`
                          })
                          }}
                      />
                  </div>
                  }

              </div>
              <div className='md:grid md:grid-rows-1 gap-2'>
                <div className="flex items-center gap-2">
                  {beneficiaries.length >= 1 && (
                    <span className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 
                    focus:ring-red-300 font-medium rounded-lg text-[10px] px-2 py-1.5 me-2 mb-2 cursor-pointer" 
                    onClick={() => handleDeleteInput(index)}><Trash2 size={18} /></span>
                  )}
                </div>
                
              </div>     
              </div>
              </AccordionContent>
              </CardContent>
            </AccordionItem>
          </Card>
        ))}
        </Accordion>
    </>
  )
}

export default BeneficiariesPartial;