import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormError } from '../components/FormError';
import { FormInput } from '../components/FormInput';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';




export const Login = () => {
  
  const {loginUser} = useContext(UserContext);
  const navegate = useNavigate();
  const {required,patternEmail, minLength, patternPassword } = formValidate();
  
  const {
    register, 
    handleSubmit, 
    formState: {errors},
    setError
  } = useForm();

  const onSubmit = async(data) => {
    try {
      await loginUser(data.email, data.password)
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
      <h1>Login</h1>
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
          
        <button type='submit'>Login</button>

      </form>
    </>
  )
}
