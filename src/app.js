
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store/configureStore';
import { getUser } from './actions/auth';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({});


const getUserQuery = gql`
{
    currentUser {
        _id
    }
}
`

client.query({
    query: getUserQuery
}).then(result => ReactDOM.render(
    <ApolloProvider client={client}>
        <App user={result} />
    </ApolloProvider>,
    document.getElementById('app'))
);