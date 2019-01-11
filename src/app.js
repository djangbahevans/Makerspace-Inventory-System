import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./components/LoginPage"
import Dashboard from './components/DashboardPage'
import Requisitions from './components/RequisitionsPage'
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import Stocks from './components/StockPage';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const routes = (
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
)

ReactDOM.render(routes, document.getElementById('app'));