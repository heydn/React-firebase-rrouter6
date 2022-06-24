import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import { FormError } from '../components/FormError';
import { FormInput } from '../components/FormInput';

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
      <h1>Register</h1>
      <FormError error={errors.firebase}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register('email',{
            required,
            pattern: patternEmail
          })}
        ></FormInput>

        <FormError error={errors.email}/>

        <FormInput
          type="password"
          placeholder="password"
          {...register('password', {
            minLength,
            required,
            pattern: patternPassword
          })}
        ></FormInput>
        
          <FormError error={errors.password}/>

          <FormInput
            type="password"
            placeholder="password" 
            {...register('repassword',{
              validate: validateEquals(getValues)
            })}
        ></FormInput>

          <FormError error={errors.repassword}/>

          <button type='submit'>Register</button>

      </form>
    </>
  )
}
