import { createStore } from "redux";
import myreducers from "./reducers";


const Store = createStore(
    myreducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store