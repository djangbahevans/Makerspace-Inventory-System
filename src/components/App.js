import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import configureStore from '../store/configureStore';
import Calender from './CalenderPage';
import Dashboard from './DashboardPage';
import Login from "./LoginPage";
import NotFoundPage from './NotFoundPage';
import Requisitions from './RequisitionsPage';
import Stocks from './StockPage';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const store = configureStore()

// store.subscribe(() => {
//     console.log(store.getState());
// });

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <CssBaseline /> 
                {/* Place Header here */}
                <Switch>
                    <Route path='/' component={Login} exact />
                    <Route path='/dashboard' component={Dashboard} exact />
                    <Route path='/requisitions' component={Requisitions} exact />
                    <Route path='/stock' component={Stocks} exact />
                    <Route path='/calender' component={Calender} exact />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </ Provider>
)

export default App