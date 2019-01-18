import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import stockReducer from "../reducers/stockReducer";
import requisitionsReducer from "../reducers/requisitionsReducer";
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(combineReducers({
        requisitions: requisitionsReducer,
        stocks: stockReducer
    }), 
    composeEnhancers(applyMiddleware(thunk)));

    return store;
}