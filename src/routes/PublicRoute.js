import gql from 'graphql-tag';
import React from 'react';
import {
    Query
} from 'react-apollo';
import {
    Redirect,
    Route
} from 'react-router-dom';


const getUserQuery = gql`
{
    currentUser {
        _id
    }
}
`

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
            query={getUserQuery}>
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