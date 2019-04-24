import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import {createDrive} from '../../actions/driveActions';
import {clearErrors} from "../../actions/postActions";


import '../../css/common/input.css';
import '../../css/create-edit-profile/create-profile.css';


class CreateDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
        };
        this.props.createDrive(profileData, this.props.history);
        this.props.clearErrors();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({errors: {...this.state.errors, [e.target.name]: ''}});
    }


    render() {
        const {errors} = this.state;

        return (

            <div className='form_wrapper'>
                <div className='edit-profile-header'>
                    <h3>Створення вашого диску</h3>
                    <small>* = обов'язкова інформація</small>
                </div>
                <div className='create-profile-contetnt'>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="* посилання на диск"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="Придумайте посилання "
                            label="handle"
                        />
                        <button className="bth-hover btn-3 submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

CreateDrive.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {clearErrors, createDrive})(withRouter(CreateDrive));
