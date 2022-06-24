export const formValidate = (getValues) => {
  return {
    required: {
      value:true,
      message:'Campo obligatorio',
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message:'Formato de email incorrecto'
    },
    minLength:{
      value: 6,
      message: 'Minimo 6 caracteres'
    },
    patternPassword: {
      //EXPPRESIÓN REGULAR QUE PERMITe CARACTERES ESPECIALES MENOS LOS ESPACIOS EN BLANCO
      value: /^(?!\s)/,
      message:'No se aceptan espacios en blanco'
    },
    validateEquals(getValues){
      return {
        equals: v => v === getValues('password') || 'No coinciden las contraseñas'
      }
    }
  }
}
