import axios from "axios"
import { JOIN_EVENT, LOGOUT_USER, REFRESH_STATE, SAVE_USER_DATA } from "./user.types"

export const saveUser=(data)=>async(dispatch)=>{
    dispatch({type:SAVE_USER_DATA,payload:data})
}

export const logoutUser=()=>async(dispatch)=>{
    dispatch({type:LOGOUT_USER})
}

export const joinEvent=(username)=>async(dispatch)=>{
    axios.get(`https://sports-app-backend-e0su.onrender.com/user/${username}`).then((res)=>{
        dispatch({type:JOIN_EVENT,payload:res.data})
    }).catch((err)=>{
        console.log(err)
    })
}

export const refreshState=(username)=>async(dispatch)=>{
    axios.get(`https://sports-app-backend-e0su.onrender.com/user/${username}`).then((res)=>{
        dispatch({type:REFRESH_STATE,payload:res.data})
    }).catch((err)=>{
        console.log(err)
    })
}