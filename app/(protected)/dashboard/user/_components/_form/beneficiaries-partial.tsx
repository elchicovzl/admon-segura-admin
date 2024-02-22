import React, { useState } from 'react'
import { PartialFormType } from '../../create/user-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  relationship: ""
};

const BeneficiariesPartial: React.FC<PartialFormType> = ({
    form,
    loading
}) => {

  const [{firstname, lastname, identification, relationship}, setState]  = useState(initialBeneState);
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryType[]>(form.getValues('beneficiaries'));

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
      documents: []
    }]);

    form.setValue('beneficiaries', [...beneficiaries, {
      firstname: firstname,
      lastname: lastname,
      identification: identification,
      relationship: relationship,
      documents: []
    }]);

    console.log(beneficiaries);

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