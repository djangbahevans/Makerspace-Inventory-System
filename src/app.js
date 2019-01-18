import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/DashboardPage';
import Login from "./components/LoginPage";
import NotFoundPage from './components/NotFoundPage';
import Requisitions from './components/RequisitionsPage';
import Stocks from './components/StockPage';
import configureStore from './store/configureStore';
import { startSetStock, addStock } from './actions/stocks';
import { startSetRequisition } from './actions/requistions';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const store = configureStore()

// store.subscribe(() => {
//     console.log(store.getState());
// });

const routes = (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <CssBaseline />
                <Switch>
                    <Route path='/' component={Login} exact />
                    <Route path='/dashboard' component={Dashboard} exact />
                    <Route path='/requisitions' component={Requisitions} exact />
                    <Route path='/stock' component={Stocks} exact />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </ Provider>
)

const start = () => {
    store.dispatch(startSetStock());
    store.dispatch(startSetRequisition());
    ReactDOM.render(routes, document.getElementById('app'))
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

start()
// store.dispatch(startSetStock())
//     .then(() => store.dispatch(startSetRequisition()).then(() => ReactDOM.render(routes, document.getElementById('app'))))
//     .catch(() => <p>Failed to get data</p>)
