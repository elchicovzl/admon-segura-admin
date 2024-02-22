import React, { useState } from 'react'
import { PartialFormType } from '../../create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from "axios";
import { useToast } from '@/components/ui/use-toast';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Loader2, XCircle } from 'lucide-react';
import { UploadButton } from "@/utils/uploadthing";


const DocumentsPartial: React.FC<PartialFormType> = ({
    form,
    loading
}) => {
    const { toast } = useToast();
    const [images, setImages] = useState<string[]>([]);
    const [imageDeleting, setImageDeleting] = useState(false);


    const handleImageDelete = async (image: string, index: number, images: string[]) => {
        setImageDeleting(true);
        const imageKey = image.substring(image.lastIndexOf('/') + 1);

        axios.post('/api/uploadthing/delete', {imageKey}).then((res) => {
            if (res.data.success) {
                images.splice(index, 1);
                setImages(images);
                form.setValue('documents.documents', images);
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
    <div className="md:w-full ">
        <FormField
            control={form.control}
            name="documents.documents"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Documentos</FormLabel>
                <FormControl>

                    {images.length ? 
                    <div className="md:grid md:grid-cols-4 gap-4 border-2 
                    border-dashed border-primary/50 p-5">
                        {images.map((image, index) => (
                            <div className="relative w-full  min-h-[200px] mt-4 border-2 
                            ">
                                <Image fill src={image} alt="otros" className="object-contain" />
                                <Button onClick={() => handleImageDelete(image, index, images)} type="button" size="icon" variant="ghost" className="absolute right-[-4px] top-0">
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
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
    </div>
  )
}

export default DocumentsPartial;