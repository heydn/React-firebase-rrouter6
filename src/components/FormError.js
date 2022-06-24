import React from 'react'

export const FormError = ({error}) => {
  return (
    <>{ error && <p>{error.message}</p> }</>
  )
}
