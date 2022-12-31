import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import axios from 'axios';
import { refreshState } from '../Store/User/user.actions';
import Loader from '../Components/Loader';

function Notifications(props) {

    const state=useSelector((store)=>store.User)
    const [data,setData]=useState(state.notification)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading]=useState(false);
    const [sdata,setSdata]=useState({
        username:"",
        id:"",
        name:"",
        message:"",
        timing:0
    })

    const handleNotification=(el)=>{
        setSdata(el)
        onOpen()
    }

    const getDate=(t)=>{
        const date=new Date(t).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
        return date
    }

    const sortData=(data)=>{
        if(data){
            let d=data.sort((a,b)=>{
               if(a.timing>b.timing){
                   return -1
               }else if(b.timing>a.timing){
                   return 1
               }else{
                   return 0
               }
           })
           setData(d)
       }else{
        setData(state.notification)
       }
    }


    const handleAccept=()=>{
        let obj={
            token:state.token,
            data:{
                id:sdata.id,
                username:sdata.username,
                name:sdata.name,
                requestid:sdata.requestid,
                timing:sdata.timing
            }
        }
        setLoading(true)
        axios.post("https://sports-app-backend-e0su.onrender.com/addplayer",obj).then((res)=>{
            console.log(res.data)
            axios.patch(`https://sports-app-backend-e0su.onrender.com/user/${state.username}`,sdata).then((res)=>{
                
                alert("Accepted request")
                dispatch(refreshState(state.username))
                sortData(state.notification)
                onClose()
                setLoading(false)
                navigate("/")
            }).catch((err)=>{
                console.log(err)
                onClose()
                setLoading(false)
            })
        }).catch((err)=>{
            alert("Cannot accept more player")
            onClose()
            setLoading(false)
        })
    }


    const handleReject=()=>{
        let obj={
            token:state.token,
            data:{
                id:sdata.id,
                username:sdata.username,
                name:sdata.name,
                requestid:sdata.requestid,
                timing:sdata.timing
            }
        }
        setLoading(true)
        axios.post("https://sports-app-backend-e0su.onrender.com/event/rejplayer",obj).then((res)=>{
            
            axios.patch(`https://sports-app-backend-e0su.onrender.com/user/${state.username}`,sdata).then((res)=>{
                alert("Rejected request")
                dispatch(refreshState(state.username))
                onClose()
                setLoading(false)
                navigate("/")
            }).catch((err)=>{
                console.log(err)
                setLoading(false)
                onClose()
            })
        }).catch((err)=>{
            console.log(err)
            alert("Error try again")
            setLoading(false)
            onClose()
        })
    }

    useEffect(()=>{
        sortData(state.notification)
    },[])
   
   if(loading===true){
    return <Loader/>
   }else{
    return (
        <Box w="80%" py="20px"  bg="#F9FBFA" m="auto" minHeight="100vh">
         <Heading fontSize="30px" mb="30px" textAlign="center" fontWeight="600">Notifications</Heading>
         {data && data.map((el)=>{
              const dateTime=getDate(el.timing)
             return <Box w="100%" cursor="pointer" m="auto" borderBottom="1px solid rgb(204, 201, 201)" p="20px" onClick={()=>handleNotification(el)}>
                 <Heading fontSize="24px" fontWeight="500">{el.message}</Heading>
                 <Heading mt="7px" fontSize="16px" fontWeight="500">Received at- {dateTime}</Heading>
             </Box>
         })}
          <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader><Heading  fontSize="26px" fontWeight="500" textTransform="uppercase">{sdata.name}</Heading></ModalHeader>
           <ModalCloseButton />
           <ModalBody>
             
             <Heading fontSize="24px" fontWeight="500" textTransform="uppercase">Username- {sdata.username}</Heading>
             <Heading fontSize="22px" fontWeight="500" >MESSAGE- {sdata.message}</Heading>
             <Heading fontSize="16px" mt="10px" fontWeight="500">Received at- {getDate(sdata.timing)}</Heading>
           </ModalBody>
 
           <ModalFooter>
             <Button colorScheme='red' mr={3} onClick={handleReject}>
               Reject
             </Button>
             <Button colorScheme='green' onClick={handleAccept}>Accept</Button>
           </ModalFooter>
         </ModalContent>
       </Modal>
        </Box>
     );
   }
}

export default Notifications;