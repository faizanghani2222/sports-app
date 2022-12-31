import {Box, Heading, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

function Signup() {

    const [data,setData]=useState({})
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()
    const toast = useToast()

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
        axios.post("https://sports-app-backend-e0su.onrender.com/user/signup",data).then((res)=>{
            setLoading(false)
            toast({
                title: 'Signup Successful',
                description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            navigate("/login")
        }).catch((err)=>{
            setLoading(false)
            toast({
                title: 'Signup Failed',
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
            <Heading textAlign="center" mb="30px" fontWeight="600">Signup</Heading>
           <form onSubmit={handleSubmit}>
           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Input onChange={(e)=>handleChange(e)} name="username" mb="7px" type="text" placeholder='Enter a unique username'/>
                <Input onChange={(e)=>handleChange(e)} name="email" mb="7px" type="Email" placeholder='Enter your email'/>
                <Input onChange={(e)=>handleChange(e)} name="password" mb="7px" type="password" placeholder='Enter a password'/>
                <Input w="30%" cursor="pointer" type="submit" value="Signup"/>
           </Box>
            </form>
        </Box>
    );
   }
}

export default Signup;