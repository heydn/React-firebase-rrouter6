export const formValidate = () => {
  return {
    required: {
      value:true,
      message:'Campo obligatorio',
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message:'Formato de email incorrecto'
    },
    patternURL: {
      value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message:'Formato de url incorrecto'
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
    validateEquals(Values){
      return {
        equals: v => v === Values || 'No coinciden las contraseñas'
      }
    }
  }
}
