import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateEvent from '../Components/CreateEvent';
import Dashboard from '../Pages/Dashboard';
import Eventdetails from '../Pages/Eventdetails';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Notifications from '../Pages/Notifications';
import Signup from '../Pages/Signup';
import PrivateRoute from './PrivateRoute';

function AllRoutes(props) {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/dashboard" element={ <PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="/event/:id" element={ <PrivateRoute><Eventdetails/></PrivateRoute>}/>
            <Route path="/create" element={ <PrivateRoute><CreateEvent/></PrivateRoute>}/>
            <Route path="/notifications" element={ <PrivateRoute><Notifications/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    );
}

export default AllRoutes;