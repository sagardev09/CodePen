import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReducer from "./projectRedcuer";

const myreducers = combineReducers({
    user: userAuthReducer,
    projects: projectReducer
})

export default myreducers