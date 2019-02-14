import ApolloClient from "apollo-boost";
import React from 'react';
import { ApolloProvider } from "react-apollo";
import { Provider } from 'react-redux';
import AppRouter from '../routes/AppRouter';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';


// const client = new ApolloClient();

const App = ({ store }) => (
    // <ApolloProvider client={client} >
        <AppRouter />
    // </ApolloProvider>
);

export default App