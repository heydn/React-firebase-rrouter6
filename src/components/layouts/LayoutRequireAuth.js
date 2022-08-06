import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

export const LayoutRequireAuth = () => {
    const {user} = useContext(UserContext)

    if(!user){
        return <Navigate to="/login" />
    }
    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    ) 
}
