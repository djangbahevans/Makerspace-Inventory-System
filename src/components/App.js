import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import AppRouter, { history } from '../routes/AppRouter';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const store = configureStore();

// store.subscribe(() => {
//     const { user } = store.getState();
//     if (user) {
//         if (history.location.pathname === '/') return history.push('/dashboard');
//     }
//     else return
// });

const App = () => (
    <Provider store={store}>
        <AppRouter />
    </ Provider>
);

export default App