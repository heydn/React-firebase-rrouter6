import React, { useContext, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
      await registerUser(data.email, data.password)
      navegate('/');
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <Title title="Registrarme"/>
      {/* <FormError error={errors.firebase}/> */}
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
          <FormError error={errors.email}/>
        </FormInput>


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
              validate: validateEquals(getValues("password")),
            })}
            label="Repite tu contraseña"
            error={errors.repassword}
        >
          <FormError error={errors.repassword}/>
        </FormInput>

        <Button 
          type="submit"
          text="Registrarme"
          color="yellow"
          loading={loading}
        />

      </form>
    </>
  )
}
