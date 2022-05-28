import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';




export const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {loginUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('procesando el form ',email,password)
    try {
        await loginUser(email, password)
        console.log('Usuario logeado');
        navigate('/');
    } catch (error) {
        console.log(error.code)
    }
}


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>

      </form>
    </>
  )
}
