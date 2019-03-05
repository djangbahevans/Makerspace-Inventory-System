import React from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route } from 'react-router-dom';
import { GET_USER_QUERY } from '../queries/Queries';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (<
    Route {
    ...rest
    }
    component={
        (props) => (<Query
            query={GET_USER_QUERY}>
            {
                ({ data }) => data.currentUser ? (<
                    Redirect to='/dashboard' />
                ) : (
                        <Component {...props} />
                    )
            }
        </Query>
        )
    }
/>
    );

export default PublicRoute;