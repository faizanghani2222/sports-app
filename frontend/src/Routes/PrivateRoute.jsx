import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
   
   const state=useSelector((state)=>state.User)


   if(state.isAuth===true){
    return children
   }else{
    return <Navigate to="/login"/>
   }
}

export default PrivateRoute;