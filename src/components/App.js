import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../routes/AppRouter';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';


const App = ({ store }) => (
    <Provider store={store}>
        <AppRouter />
    </ Provider>
);

export default App