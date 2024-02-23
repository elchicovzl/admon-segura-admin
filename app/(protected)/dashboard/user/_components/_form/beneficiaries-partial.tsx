import React, { useState } from 'react'
import { PartialFormType } from '../../create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, XCircle } from 'lucide-react';
import { UploadButton } from '@/utils/uploadthing';
import { toast } from '@/components/ui/use-toast';

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
    loading
}) => {

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

  return (
    <div className="">
      <div className="md:grid md:grid-cols-5 gap-8" key={0}>
            <div className='md:grid md:grid-rows-1 gap-2'>
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
                  <span className="cursor-pointer" onClick={() => handleAddInput()}>Add</span>
              </div>
            </div>     
          </div>

        {beneficiaries.map((item, index) => (
          <div className="md:grid md:grid-cols-5 gap-8" key={index}>
            <div className='md:grid md:grid-rows-1 gap-2'>
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
                    {beneficiaries[index].documents.map((doc, index) => (
                        <div className="relative w-full  min-h-[200px] mt-4 border-2 
                        ">
                            <Image fill src={doc} alt="otros" className="object-contain" />
                            <Button onClick={() => ({})} type="button" size="icon" variant="ghost" className="absolute right-[-4px] top-0">
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
                        form.setValue(`beneficiaries.${index}.documents`, imgs);
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
                {beneficiaries.length > 1 && (
                  <span className="cursor-pointer" onClick={() => handleDeleteInput(index)}>Delete</span>
                )}
              </div>
              
            </div>     
          </div>
        ))}
    </div>
  )
}

export default BeneficiariesPartial;