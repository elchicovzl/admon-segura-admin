import React, { useState } from 'react'
import { PartialFormType } from '../../create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from "axios";
import { useToast } from '@/components/ui/use-toast';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Archive, Loader2, XCircle } from 'lucide-react';
import { UploadButton } from "@/utils/uploadthing";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const DocumentsPartial: React.FC<PartialFormType> = ({
    form,
    loading,
    edit
}) => {
    const { toast } = useToast();

    const documentsData = (edit)? form.getValues('documents') : form.getValues('documents.documents')
    const [images, setImages] = useState<string[]>(documentsData);
    const [imageDeleting, setImageDeleting] = useState(false);


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
                setImages(images);
                form.setValue('documents.documents', images);
                toast({
                    variant: "success",
                    description: "Documento removido exitosamente!."
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
    <Card className="">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Archive /> Documentos necesarios para afiliación del usuario. <span className="text-xs text-gray-700">(max 5 archivos)</span>
            </CardTitle></CardHeader>
        <CardContent>   
            <div className="md:w-full ">
                <FormField
                    control={form.control}
                    name="documents.documents"
                    render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Documentos</FormLabel> */}
                        <FormControl>

                            {images.length ? 
                            <div className="md:grid md:grid-cols-4 gap-4 border-2 
                            border-dashed border-primary/50 p-5">
                               
                                
                                {images.map((image, index) => (
                                    <div className="relative w-full  min-h-[200px] mt-4 border-2" key={index}>
                                        <Image fill src={edit? image.source: image} alt="otros" className="object-contain" />
                                        <Button onClick={() => handleImageDelete(edit? image.source: image, index, images)} type="button" size="icon" variant="ghost" className="absolute right-[-4px] top-0">
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
                                    setImages(imgs);
                                    form.setValue('documents.documents', imgs);
                                    toast({
                                        variant: 'success',
                                        description: 'Subida de documentos exitosa!'
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

export default DocumentsPartial;