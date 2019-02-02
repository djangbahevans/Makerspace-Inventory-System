import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <Redirect to='/dashboard' />
            ) : (
                    <Component {...props} />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: state.user._id
});

export default connect(mapStateToProps)(PublicRoute);
