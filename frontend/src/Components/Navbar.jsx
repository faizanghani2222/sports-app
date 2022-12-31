import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../Store/User/user.actions';

function Navbar(props) {
    const state=useSelector((store)=>store.User)
    const dispatch=useDispatch()

    const handleLogout=()=>{
        dispatch(logoutUser())
    }

    return (
        <Box w="100%" height="65px" color="white" background="#008ECC" display="flex" justifyContent="space-evenly" alignItems="center">
           <Link to="/"> <Heading cursor="pointer" fontSize="28px" fontWeight='700'>Sports App</Heading></Link>
            <Box w="60%" display="flex" justifyContent="space-between" alignItems="center">
                <Link to="/dashboard"><Heading cursor="pointer" fontSize="21px" fontWeight='400'>Dashboard</Heading></Link>
                <Link to="/notifications"><Heading cursor="pointer" fontSize="21px" fontWeight='400'>Notifications</Heading></Link>
               {state.isAuth?<Button onClick={handleLogout} variant="outline" fontSize="21px" fontWeight='400'>Logout</Button> :<Link to="/login"><Heading cursor="pointer" fontSize="21px" fontWeight='400'>Login</Heading></Link>}
                {!state.isAuth?<Link to="/signup"><Heading cursor="pointer" fontSize="21px" fontWeight='400'>Signup</Heading></Link>:""}
            </Box>
        </Box>
    );
}

export default Navbar;