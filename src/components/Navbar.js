import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

export const Navbar = () => {
    const {user, signOutUser} = useContext(UserContext);

    const handleClickLogOut = async() => {
        try {
            await signOutUser()
        } catch (error) {
            console.log(error.code)
        }
    }




  return (
    <div>
        {user ? (
            <>
                <NavLink to="/">Inicio</NavLink>
                <button onClick={handleClickLogOut}>Logout</button>
            </>
        ):(
            <>
                <NavLink to="/login">Login | </NavLink>
                <NavLink to="/register">Register |</NavLink>
            </>
        )
        }

    </div>
  )
}
