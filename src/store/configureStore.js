import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import requisitionsReducer from "../reducers/requisitionsReducer";
import stockReducer from "../reducers/stockReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(combineReducers({
        requisitions: requisitionsReducer,
        stocks: stockReducer,
        user: authReducer
    }), 
    composeEnhancers(applyMiddleware(thunk)));
    
    return store;
}