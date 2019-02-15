
import ApolloClient, { gql } from "apollo-boost";
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';


const client = new ApolloClient();

const getUserQuery = gql`
{
    currentUser {
        _id
    }
}
`

client.query({
    query: getUserQuery
}).then(() => ReactDOM.render(
    <ApolloProvider client={client}>
        <AppRouter />
    </ApolloProvider>,
    document.getElementById('app'))
);