import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import {Link} from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });

    };

    render() {
        const {errors} = this.state;

        return (
            <div className="form-root-content">
                <h3 className='form-root-content-header'>Log in</h3>
                <form className='form-root-content-width' onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        autocomplete="email"
                        label='Email'
                    />

                    <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                        autocomplete="password"
                        label='Password'
                    />
                    <button className="form-root-content-button" type="submit">Login</button>
                </form>


                <Link to="/restore_password">
                    <button className="form-root-content-button">Forgot password</button>
                </Link>
            </div>

        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
