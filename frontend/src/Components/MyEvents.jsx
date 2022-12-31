import { Box, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEventDetail } from '../Store/Events/events.actions';
import Loader from './Loader';

function MyEvent() {

   const [data,setData]=useState([]);
   const dispatch=useDispatch()
   const [loading,setLoading]=useState(false);
   const state=useSelector((store)=>store.User)

   const handleDetails=(el)=>{
    dispatch(saveEventDetail(el))
   }

    useEffect(()=>{
        setLoading(true)
        axios.get("https://sports-app-backend-e0su.onrender.com/event").then((res)=>{
            let d=res.data.filter((el)=>{
                return el.username===state.username
            })
            setData(d)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    },[])

    if(loading===true){
       return <Loader/>
    }else{
        return (
            <Box width="80%" m="auto" >
             <Box mb="30px"></Box>
             <Heading mb="30px">My Events</Heading>
             <Box>
             {data && data.map((el,i)=>{
                 const date=new Date(el.timing).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
                 return <Link key={i} to={`/event/${el._id}` }onClick={()=>handleDetails(el)}>
                 <Box key={i} width="100%" p="20px" m="auto" mt="20px" display="flex" gap="10px"  boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px">
                   <Box w="12%">
                     <Image  src="https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg?w=360" w="100px" alt="error"/>
                   </Box>
                   <Box w="80%" display="flex" justifyContent="space-between" alignItems="start">
     
                   <Box><Heading fontWeight="600" fontSize="26px" mb="10px" textTransform="uppercase"> {el.name}</Heading>
                   <Heading fontWeight="600" fontSize="21px">category- {el.category}</Heading>
                   <Heading fontWeight="600" fontSize="21px">Event starts from- {date}</Heading>
                   </Box>
     
                   <Box>
                   <Heading fontWeight="600" fontSize="21px">Max Players- {el.limit}</Heading>
                   <Heading fontWeight="600" fontSize="21px">Players Enrolled- {el.players.length}</Heading></Box>    
                 </Box>
                   
                 </Box></Link>
             })}
             </Box>
            </Box>
         );
    }
}

export default MyEvent;