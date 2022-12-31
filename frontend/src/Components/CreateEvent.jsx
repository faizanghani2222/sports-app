import {Box, Heading, Input, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshState } from '../Store/User/user.actions';
import Loader from './Loader';

function CreateEvent() {

    const [data,setData]=useState({})
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch()
   const state=useSelector((store)=>store.User)
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
       console.log(data)
        const date = new Date(data.timing);
       
        let ms = date.getTime() ;
        let d=data
       
        d.timing=ms
        let obj={
            token:state.token,
            data:d
        }
       setLoading(true)
        axios.post("https://sports-app-backend-e0su.onrender.com/event/create",obj).then((res)=>{
            toast({
                title: 'Event created Successfully',
                description: "Your event is live now.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              dispatch(refreshState(data.username))
              setLoading(false)
        }).catch((err)=>{
            setLoading(false)
            toast({
                title: 'Failed to create event try again',
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
            <Heading textAlign="center" mb="30px" fontWeight="600">Create Event</Heading>
           <form onSubmit={handleSubmit}>
           <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Input required onChange={(e)=>handleChange(e)} name="username" mb="7px" type="text" placeholder='Enter your username'/>
                <Input required onChange={(e)=>handleChange(e)} name="name" mb="7px" type="text" placeholder='Enter event name'/>
                <Input required onChange={(e)=>handleChange(e)} name="description" mb="7px" type="text" placeholder='Enter a short description'/>
                <Input required onChange={(e)=>handleChange(e)} name="limit" mb="7px" type="number" placeholder='Enter max players'/>
                <Input required onChange={(e)=>handleChange(e)} name="timing" mb="7px" type="datetime-local" placeholder='Enter Start date and time'/>
                <Select isRequired name="category" onChange={(e)=>handleChange(e)} placeholder="Select event category">
                    <option value="football">Football</option>
                    <option value="cricket">Cricket</option>
                    <option value="basketball">BasketBall</option>
                    <option value="baseball">BaseBall</option>
                </Select>
                <Input w="30%" mt="5px" cursor="pointer" type="submit" value="Create"/>
           </Box>
            </form>
        </Box>
    );
   }
}

export default CreateEvent;