import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';


const getUserQuery = gql`
{
    currentUser {
        _id
    }
}
`

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={props => (
            <Query query={getUserQuery}>
                {({ data }) =>
                data.currentUser ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to='/' />
                        )}
            </Query>
        )} />
    );

export default PrivateRoute;
