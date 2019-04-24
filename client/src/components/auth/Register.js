import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import '../../css/auth/index.css'
import classnames from 'classnames';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            role: '',
            role_password: '',
            errors: {},
            confirm_password: false
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            role_password: this.state.role_password
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {

        const {errors} = this.state;
        const options = [
            {label: 'Studetn', value: 0},
            {label: 'Teacher', value: 1},
            {label: 'Admin', value: 2},
        ];

        const password_teacher = (
            <div className={classnames('hide-confirm-password', {'show-confirm-password': +this.state.role})}>
                <TextFieldGroup
                    placeholder="Confirm teacher password"
                    name="role_password"
                    type="password"
                    value={this.state.role_password}
                    onChange={this.onChange}
                    error={errors.role_password}
                    autocomplete="password"
                    label='Password'
                />
            </div>);


        return (
            <div className="form-root-content">
                <h3 className='form-root-content-header'>Sign up form</h3>
                <form className='form-root-content-width' noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="Email"
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
                    <SelectListGroup
                        placeholder="Status"
                        onChange={this.onChange}
                        value={this.state.role}
                        name="role"
                        options={options}
                        error={errors.role}
                        info="Select your role in Scope"
                    />
                    {password_teacher}
                    <button className="form-root-content-button" type="submit">Register</button>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
