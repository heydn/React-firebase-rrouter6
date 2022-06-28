import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { FormInput } from '../components/FormInput';
import { Title } from '../components/Title';
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
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  }

  return (
    <>
      <Title title="Login" />
      {/* <FormError error={errors.firebase}/> */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <FormInput
            label="Ingresa tu correo electrónico"
            type="email"
            placeholder="Ingrese email"
            {...register('email',{
              required,
              pattern: patternEmail
            })}
            error={errors.email}
        >
        </FormInput>
          <FormError error={errors.email}/>


        <FormInput
          label="Ingresa tu contraseña"
          type="password"
          placeholder="password"
          {...register('password', {
            minLength,
            required,
            pattern: patternPassword
          })}
          error={errors.password}
        >
        </FormInput>
          <FormError error={errors.password}/>
        
        <Button 
          text="Login"
          type="submit" 
        />

      </form>
    </>
  )
}
