import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true && auth.user.role === 'Admin'  ? (
                <Component {...props} />
            ) : (
                <Redirect to="/dashboard" />
            )
        }
    />
);

PrivateRouteAdmin.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
