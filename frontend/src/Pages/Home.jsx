import { Box, Heading, Image, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEventDetail } from '../Store/Events/events.actions';
import { FaSistrix } from "react-icons/fa";
import Loader from '../Components/Loader';

function Home() {

   const [data,setData]=useState([]);
   const [fdata,setFdata]=useState([]);
   const [query,setQuery]=useState("");
   const [loading,setLoading]=useState(false);
   const dispatch=useDispatch()


   const handleChange=(e)=>{
    let value=e.target.value
    setQuery(value)
   }

   const handleSearch=(e)=>{
    e.preventDefault();

    if(query!==""){
    let d=data.filter((el)=>{
        return el.name===query
    })
    setFdata([...d])
    }else{
        setFdata(data)
    }
   }

   const handleDetails=(el)=>{
    dispatch(saveEventDetail(el))
   }

   const handleFilter=(e)=>{
    let value=e.target.value

    if(value===""){
        setFdata(data)
    }else{
        let f=data.filter((el)=>{
            return el.category===value
        })
        setFdata(f)
    }
   }

   const handleSort=(e)=>{
    let value=e.target.value
    if(value==="htl"){
        let f=fdata.sort((a,b)=>{
            if(a.timing>b.timing){
                return -1
            }else if(b.timing>a.timing){
                return 1
            }else{
                return 0
            }
        })
        setFdata([...f])
    }else if(value==="lth"){
        let f=fdata.sort((a,b)=>{
            if(a.timing>b.timing){
                return 1
            }else if(b.timing>a.timing){
                return -1
            }else{
                return 0
            }
        })
        setFdata([...f])
    }

   }

    useEffect(()=>{
        setLoading(true)
        axios.get("https://sports-app-backend-e0su.onrender.com/event").then((res)=>{
            setData(res.data)
            setFdata(res.data)
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
             <Box my="30px" display="flex" justifyContent={"space-between"} alignItems="center">
             <Heading>All Events</Heading>
             <Box w="30%">
             <form onSubmit={handleSearch}>
             <InputGroup>
             <InputLeftElement
           pointerEvents='none'
           children={<FaSistrix color='gray.300' />}
         />
             <Input w="100%" type="text" placeholder="search by event name" onChange={(e)=>handleChange(e)}/>
             </InputGroup>
             </form>
             </Box>
             <Select w="20%" name="filter" onChange={(e)=>handleFilter(e)} placeholder="Filter by category">
                 <option value="football">Football</option>
                 <option value="basketball">BasketBall</option>
                 <option value="cricket">Cricket</option>
                 <option value="baseball">BaseBall</option>
             </Select>
             <Select w="20%" name="sort" onChange={(e)=>handleSort(e)} placeholder="Sort by date and time">
                 <option value="lth">Oldest first</option>
                 <option value="htl">Latest first</option>
             </Select>
             </Box>
             
             <Box>
             {fdata && fdata.map((el,i)=>{
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

export default Home;