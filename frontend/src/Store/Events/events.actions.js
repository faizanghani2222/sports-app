
import { SAVE_EVENT_DETAIL } from "./events.types"

export const saveEventDetail=(data)=>async(dispatch)=>{
    dispatch({type:SAVE_EVENT_DETAIL,payload:data})
}

