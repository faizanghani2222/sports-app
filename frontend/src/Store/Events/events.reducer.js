import { SAVE_EVENT_DETAIL } from "./events.types"

const intialState={
    username:"",
    name:"",
    description:"",
    players:[],
    timing:0,
    limit:10,
    category:"",
    _id:""
}


export const eventReducer=(state=intialState,action)=>{
    let payload=action.payload
    switch(action.type){
        case SAVE_EVENT_DETAIL :
          return {
            ...state,
            ...payload
          }
        default :
        return state
    }
}