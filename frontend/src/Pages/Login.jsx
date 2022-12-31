import { Box, Heading, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { saveUser } from '../Store/User/user.actions';

function Login() {
    const toast=useToast()
    const [data,setData]=useState({})
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({
        ...data,
        [name]:value
    })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        axios.post("https://sports-app-backend-e0su.onrender.com/user/login",data).then((res)=>{
            dispatch(saveUser(res.data))
            toast({
                title: 'Login Successful',
                description: "You are now logged in.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              setLoading(false)
            navigate("/")
        }).catch((err)=>{
            setLoading(false)
            toast({
                title: 'Login Failed',
                description: "Try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    }




   if(loading===true){
    return <Loader/>
   }else{
    return (
        <Box w="40%" p="30px"  m="auto" mt="50px"  boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px" borderRadius="2em">
            <Heading textAlign="center" mb="30px" fontWeight="600">Login</Heading>
           <form onSubmit={handleSubmit}>
           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Input onChange={(e)=>handleChange(e)} name="username" mb="7px" type="text" placeholder='Enter your username'/>
                <Input onChange={(e)=>handleChange(e)} name="password" mb="7px" type="password" placeholder='Enter your password'/>
                <Input w="30%" cursor="pointer"  type="submit" value="Login"/>
           </Box>
            </form>
        </Box>
    );
   }
}

export default Login;