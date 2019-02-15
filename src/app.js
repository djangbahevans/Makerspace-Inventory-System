
import ApolloClient from "apollo-boost";
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { GET_USER_QUERY } from "./Queries/Queries";
import AppRouter from './routes/AppRouter';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';


const client = new ApolloClient();

client.query({
    query: GET_USER_QUERY
}).then(() => ReactDOM.render(
    <ApolloProvider client={client}>
        <AppRouter />
    </ApolloProvider>,
    document.getElementById('app'))
);