import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../routes/AppRouter';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';


const client = new ApolloClient();

const App = ({ store }) => (
    <ApolloProvider client={client} >
        <Provider store={store} >
            <AppRouter />
        </ Provider>
    </ApolloProvider>
);

export default App