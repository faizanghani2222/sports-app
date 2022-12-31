import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { eventReducer } from "./Events/events.reducer";
import { userReducer } from "./User/user.reducer";

const rootReducer=combineReducers({
    User:userReducer,
    Event:eventReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));