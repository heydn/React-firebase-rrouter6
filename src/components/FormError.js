import React from 'react'

export const FormError = ({error}) => {
  return (
    <>{ error && (
        <p className="mb-5 text-sm text-red-600 dark:text-red-500 text-left">
          <span className="font-medium">Oops!</span> {error.message}
        </p>
      ) }</>
  )
}
