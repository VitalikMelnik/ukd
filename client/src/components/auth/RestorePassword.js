import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {restorePassword} from "../../actions/authActions";

class RestorePassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            errors: {}
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

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
        };
        this.props.restorePassword(userData, this.props.history);
    };
    onChange = e => {
        this.setState({errors: {}});
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        let {errors} = this.state;
        return (
            <div className='form-root-content'>
                <h3 className='form-root-content-header'>You forget password? Enter your email!</h3>
                <form className='form-root-content-width' onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        autocomplete="email"
                        label='Email'
                    />
                    <div className="err">{errors.all}</div>
                    <button className="form-root-content-button" type="submit">Restore Password</button>
                </form>
            </div>
        )
    }
}

RestorePassword.propTypes = {
    restorePassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {restorePassword})(withRouter(RestorePassword));