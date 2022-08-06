import { ButtonLoading } from "./ButtonLoading"

export const Button = ({text, type, color = 'yellow', loading, onClick}) => {
  
  if(loading) return <ButtonLoading />
    
  return (
    <button 
          className={
            `focus:outline-none text-white bg-${color}-400 hover:bg-${color}-500 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-${color}-900`
          }
          type={type}
          onClick={onClick}
        >
          {text}
    </button>
  )
}
 