import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={props => (
            isAuthenticated ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                    <Redirect to='/' />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: state.user._id
});

export default connect(mapStateToProps)(PrivateRoute);
