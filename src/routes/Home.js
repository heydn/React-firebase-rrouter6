import React, { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { formValidate } from '../utils/formValidate';
import {useForm} from 'react-hook-form';
import { Title } from '../components/Title';
import {Button} from '../components/Button';
import { FormInput } from '../components/FormInput';
import { FormError } from '../components/FormError';
import { erroresFirebase } from '../utils/erroresFirebase';
import { nanoid } from 'nanoid';

export const Home = () => {

  const [copy, setCopy] = useState({});

    const {required, patternURL } = formValidate();
    const {
      register, 
      handleSubmit, 
      formState: {errors},
      resetField,
      setValue,
      setError
    } = useForm();
    // AQUI VOY

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore();
    const [newOriginID, setNewOriginID] = useState();

    useEffect(() => {
      console.log('getData')
      getData()
    }, [])


    if(loading.getData) return <p>Loading getData...</p>
    if (error) return <p>{error}</p>
    
    const onSubmit = async({url}) => {
      try {
        if (newOriginID) {
          await updateData(newOriginID,url)
          setNewOriginID('');
        } else {
          await addData(url)
        }
        resetField('url');
      } catch (error) {
        const { code, message } = erroresFirebase(error.code);
        setError(code, { message });
      }
    }

    const handleClickDelete = async(nanoid) =>  {
      console.log("click delete")
      await deleteData(nanoid)
    }

    const handleClickEdit = (item) => {
      setValue('url',item.origin);
      setNewOriginID(item.nanoid);
      console.log(item.origin);
    }

    const pathURL = window.location.href;

    const handleClickCopy = async(item) => {
      await navigator.clipboard.writeText(window.location.href + item.nanoid)
      setCopy({ [item.nanoid]:true });
    }


  return (
    <>
        <Title title="Home" />

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <FormInput
              label="Ingresa tu URL"
              type="text"
              placeholder="ex: https://paginaweb.cl"
              {...register('url',{
                required,
                pattern: patternURL
              })}
              error={errors.url}
          >
          </FormInput>
            <FormError error={errors.url}/>
           {
            newOriginID ? 
            (
              <Button 
                type="submit"
                text="Actualizar Url"
                color="yellow"
                loading={loading.updateData}
              />
            ) : (
              <Button 
                type="submit"
                text="Agregar Url"
                color="yellow"
                loading={loading.addData}
              />
            )
            
          }
        </form>

        {
          data.map((item) => (
            <div key={item.nanoid} className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-2">
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {pathURL}{item.nanoid}
              </h5>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                {item.origin}
              </p>
                <Button 
                  type="button"
                  text="Borrar"
                  color="red"
                  loading={loading[item.nanoid]}
                  onClick={() => handleClickDelete(item.nanoid)}
                />
                <Button 
                  type="button"
                  text="Editar"
                  color="green"
                  onClick={() => handleClickEdit(item)}
                />
                <Button 
                  type="button"
                  text={copy[item.nanoid] ? 'Copiado' : 'Copiar'}
                  color="blue"
                  onClick={() => handleClickCopy(item)}
                />

            </div>
          ))
        }
    </>
  )
}
