import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import PlayerList from '../Components/PlayerList';
import { joinEvent } from '../Store/User/user.actions';

function Eventdetails() {
    const state=useSelector((store)=>store.Event)
    const user=useSelector((store)=>store.User)
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false);



    const handleJoin=()=>{
        let d=Date.now()
        const obj={
            token:user.token,
            data:{
                username:state.username,
                eventtiming: state.timing,
                event:state.name,
                timing:d,
                id:state._id
           }
        }
        setLoading(true)
        axios.post("https://sports-app-backend-e0su.onrender.com/event/join",obj).then((res)=>{
            dispatch(joinEvent(user.username))
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    }


    const handlePlayers=()=>{
        let flag=""
        if(user.username===state.username){
            return <PlayerList data={state.players}/>
        }else{
            user.events.forEach(el => {
                if(el.id===state._id && el.status==="accepted"){
                    flag="accepted"
                }else if(el.id===state._id && el.status==="pending"){
                    flag="pending"
                }
            });
            if(flag==="accepted"){
                return <PlayerList data={state.players}/>
            }else if(flag==="pending"){
                return <Button bg="orange" color="white" disabled={true}>Request Pending</Button>
            }else{
                 return <Button colorScheme="orange" onClick={handleJoin}>Join Event</Button>
                }
        }
         
    }


   




    const date=new Date(state.timing).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    if(loading===true){
        return <Loader/>
    }else{
        return (
            <Box w="80%" m="auto" mt="30px">
                <Heading fontSize="30px" textAlign="center" textTransform={"uppercase"}>{state.name}</Heading>
                <Box mt="30px" display="flex" gap="20px" alignItems="center">
                    <Box>
                        <Image w="150px" src="https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg?w=360" alt="error"/>
                    </Box>
                    <Box w="100%" display="flex" justifyContent={"space-between"} alignItems="start">
                        <Box>
                            <Heading mb="10px" fontSize="21px" textTransform={"uppercase"} fontWeight="500">Organized By - {state.username}</Heading>
                            <Heading fontSize="21px" textTransform={"uppercase"} fontWeight="500"> Category- {state.category}</Heading>
                            <Heading fontSize="21px" textTransform={"uppercase"} fontWeight="500"> Max Player- {state.limit}</Heading>
                        </Box>
                        <Box>
                            <Heading fontSize="21px" textTransform={"uppercase"} fontWeight="500"> Starts at- {date}</Heading>
                        </Box>
                        </Box>
                </Box>
                <Box mt="30px">
                <Heading fontSize="21px" textTransform={"uppercase"} fontWeight="500">Description- {state.description}</Heading>
                </Box>
                <Box mt="30px">
                {handlePlayers()}
                </Box>
            </Box>
        );
    }
}

export default Eventdetails;