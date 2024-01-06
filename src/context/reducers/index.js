import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReducer from "./projectRedcuer";
import searchReducer from "./searchReducers";

const myreducers = combineReducers({
    user: userAuthReducer,
    projects: projectReducer,
    searchterm: searchReducer
})

export default myreducers