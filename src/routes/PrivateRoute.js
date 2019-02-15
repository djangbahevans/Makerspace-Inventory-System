import React from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';
import { GET_USER_QUERY } from '../Queries/Queries';


export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={props => (
            <Query query={GET_USER_QUERY}>
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
