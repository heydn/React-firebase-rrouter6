import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';




export const Login = () => {
const {user, setUser} = useContext(UserContext)
 const navegate = useNavigate()

const handleClickLogin = () => {
  setUser(true)
  navegate("/")
} 

  return (
    <>
        <h1>Login</h1>
        <h2>{ user ? 'En Línea' : 'Offline' }</h2>
        <button onClick={handleClickLogin}>Acceder</button>
    </>
  )
}
