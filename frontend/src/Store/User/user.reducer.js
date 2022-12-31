import { JOIN_EVENT, LOGOUT_USER, REFRESH_STATE, SAVE_USER_DATA } from "./user.types"

const intialState={
    username:"",
    events:[],
    notification:[],
    token:"",
    isAuth:false
}


export const userReducer=(state=intialState,action)=>{
    let payload=action.payload
    switch(action.type){
        case SAVE_USER_DATA :
            let obj={username:payload.user.username,
                events:payload.user.events,
                notification:payload.user.notification,
                token:payload.token,
                isAuth:true
                }
            return obj
            case LOGOUT_USER :
                let temp={username:"",
                    events:[],
                    notification:[],
                    token:"",
                    isAuth:false
                    }
                return temp
            case JOIN_EVENT :
                let d={
                    events:payload.events,
                    notification:payload.notification
                    }
                return {
                    ...state,
                    ...d
                }
                case REFRESH_STATE :
                    let n={
                        events:payload.events,
                        notification:payload.notification
                        }
                    return {
                        ...state,
                        ...n
                    }
        default :
        return state
    }
}