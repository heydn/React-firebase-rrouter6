import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

export const Register = () => {
    
  const navegate = useNavigate();
  const {registerUser} = useContext(UserContext);

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
      console.log('Usuario creado');
      navegate('/');
    } catch (error) {
      console.log(error.code);
      switch(error.code){
        case 'auth/email-already-in-use':
          setError(
            'email', {
              message: 'Usuario ya registrado'
            }
          )
          break;
        default: console.log('Error de Servidor');
      }
    }
  }
      


  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="email"
          placeholder="email"
          {...register('email',{
            required: {
              value:true,
              message:'Campo obligatorio',
            },
            pattern: {
              value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message:'Formato de email incorrecto'
            }
              
          })}
        />
        { errors.email && <p>{errors.email.message}</p> }

        <input 
          type="password"
          placeholder="password" 
          {...register('password', {
            minLength:{
              value: 6,
              message: 'Minimo 6 caracteres'
            },
            required:{
              value: true,
              message: 'Campo obligatorio'
            },
            pattern: {
              //EXPPRESIÓN REGULAR QUE PERMITe CARACTERES ESPECIALES MENOS LOS ESPACIOS EN BLANCO
              value: /^(?!\s)/,
              message:'No se aceptan espacios en blanco'
            }
          })}
        />
          { errors.password && <p>{errors.password.message}</p> }

          <input 
            type="password"
            placeholder="password" 
            {...register('repassword',{
              validate:{
                equals: v => v === getValues('password') || 'No coinciden las contraseñas'
              }
            })}
          />
          { errors.repassword && <p>{errors.repassword.message}</p> }

          <button type='submit'>Register</button>

      </form>
    </>
  )
}
