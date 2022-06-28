import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import { FormError } from '../components/FormError';
import { FormInput } from '../components/FormInput';
import { Title } from '../components/Title';
import { Button } from '../components/Button';

export const Register = () => {
    
  const navegate = useNavigate();
  const {registerUser} = useContext(UserContext);
  const {required,patternEmail, minLength, patternPassword,validateEquals } = formValidate();

  const {
    register, 
    handleSubmit, 
    formState: {errors},
    getValues,
    setError
  } = useForm();

  const onSubmit = async(data) => {
    try {
      await registerUser(data.email, data.password)
      navegate('/');
    } catch (error) {
      console.log(error.code);
      setError('firebase',{
        message: erroresFirebase(error.code),
      })
    }
  }

  return (
    <>
      <Title title="Registrarme"/>
      <FormError error={errors.firebase}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register('email',{
            required,
            pattern: patternEmail
          })}
          label="Ingresa tu correo electrónico"
          error={errors.email}
        >
        </FormInput>
        <FormError error={errors.email}/>


        <FormInput
          type="password"
          placeholder="password"
          {...register('password', {
            minLength,
            required,
            pattern: patternPassword
          })}
          label="Ingresa tu contraseña"
          error={errors.password}
        ></FormInput>
        
          <FormError error={errors.password}/>

          <FormInput
            type="password"
            placeholder="password" 
            {...register('repassword',{
              validate: validateEquals(getValues)
            })}
            label="Repite tu contraseña"
            error={errors.repassword}
        ></FormInput>

          <FormError error={errors.repassword}/>

          <Button 
            text="Registrarme"
            type="submit" 
          />

      </form>
    </>
  )
}
