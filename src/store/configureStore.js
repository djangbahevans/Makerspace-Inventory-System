import { createStore, combineReducers } from "redux";
import stockReducer from "../reducers/stockReducer";
import requisitionsReducer from "../reducers/requisitionsReducer";

export default () => {
    const store = createStore(combineReducers({
        requisitions: requisitionsReducer,
        stocks: stockReducer
    }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
}