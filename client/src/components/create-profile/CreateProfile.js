import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import ModalWindow from '../common/Modal';
import {createProfile} from '../../actions/profileActions';
import Avatar from 'react-avatar-edit'
import {clearErrors} from "../../actions/postActions";
import classnames from "classnames";


import '../../css/common/input.css';
import '../../css/create-edit-profile/create-profile.css';



class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            displayUploadImg: false,
            displaySizeImg: false,
            displayColorSelect: false,
            name: '',
            handle: '',
            preview: null,
            status: '',
            location: '',
            credo: '',
            bio: '',
            color: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeModalWindow = this.onChangeModalWindow.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        CreateProfile.onBeforeFileLoad = CreateProfile.onBeforeFileLoad.bind(this)
    }

    static onBeforeFileLoad(e) {
        if (e.target.files[0].size > 40960) {
            this.setState({displaySizeImg: true});
            e.target.value = "";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            edit_profile: true,
            name: this.state.name,
            handle: this.state.handle,
            preview: this.state.preview,
            status: this.state.status,
            location: this.state.location,
            credo: this.state.credo,
            bio: this.state.bio,
            color: this.state.color,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        this.props.createProfile(profileData, this.props.history);
        this.props.clearErrors();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    onChangeModalWindow(e) {
        this.setState({[e.target.name]: !this.state[e.target.name]});
    }

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview})
    }

    render() {
        const {errors} = this.state;
        let socialInputs = (
            <div className="modal-window-center-content">
                <div className='modal-window-social'>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        label="twitter"
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                        label="facebook"
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                        label="linkedin"
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                        label="youtube"
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                        label="instagram"
                    />
                </div>
            </div>
        );
        let avatar_content = (
            <div className="modal-window-center-content">
                <div className='modal-window-avatar'>
                    <Avatar
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        onBeforeFileLoad={CreateProfile.onBeforeFileLoad}
                        width={200}
                        height={200}
                        label='Загрузіть ваше фото'
                    />
                    {this.state.preview ?
                        <img src={this.state.preview} className='modal-window-img' alt="Preview"/> : null}
                </div>
            </div>
        );
        let size_img = (
            <div className="modal-window-center-content">
                File is too big!
            </div>
        );
        let select_color = (
            <div className="modal-window-center-content">
                <label className="amber">
                    <input className='radio-select-color' type="radio" onChange={this.onChange} name="color"
                           value="amber"/>
                    <div className="select-color-button"><span/></div>
                </label>
                <label className="orange">
                    <input className='radio-select-color' type="radio" onChange={this.onChange} name="color"
                           value="orange"/>
                    <div className="select-color-button"><span/></div>
                </label>
                <label className="lime">
                    <input className='radio-select-color' type="radio" onChange={this.onChange} name="color"
                           value="lime"/>
                    <div className="select-color-button"><span/></div>
                </label>

                <label className="blue">
                    <input className='radio-select-color' type="radio" onChange={this.onChange} name="color"
                           value="blue"/>
                    <div className="select-color-button"><span/></div>
                </label>
            </div>
        );

        return (

            <div className='form_wrapper'>
                <div className='edit-profile-header'>
                    <h3>Створення вашого профілю</h3>
                    <small>* = обов'язкова інформація</small>
                </div>
                <div className='create-profile-contetnt'>
                    <form onSubmit={this.onSubmit}>
                        {/*Modal Windows*/}
                        <ModalWindow
                            name='displayUploadImg'
                            value={!this.state.displayUploadImg}
                            content={avatar_content}
                            onChange={this.onChangeModalWindow}
                        />
                        <ModalWindow
                            name='displaySocialInputs'
                            value={!this.state.displaySocialInputs}
                            content={socialInputs}
                            onChange={this.onChangeModalWindow}
                        />
                        <ModalWindow
                            name='displaySizeImg'
                            content={size_img}
                            value={!this.state.displaySizeImg}
                            onChange={this.onChangeModalWindow}
                        />
                        <ModalWindow
                            name='displayColorSelect'
                            content={select_color}
                            value={!this.state.displayColorSelect}
                            onChange={this.onChangeModalWindow}
                        />

                        {/*Input data*/}
                        <TextFieldGroup
                            placeholder="* Ім'я та прізвище"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            info="Ваше ім'я та прізвище"
                            label="Name"
                        />
                        <TextFieldGroup
                            placeholder="* нікнейм в платформі"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="Ваш нікнейм в платформі, створюється один раз"
                            label="handle"
                        />
                        <button className="bth-hover btn-3" name='displayUploadImg' type="button"
                                onClick={this.onChangeModalWindow}>Add my Avatar
                        </button>
                        <button className="bth-hover btn-3" name='displayColorSelect' type="button"
                                onClick={this.onChangeModalWindow}>Add my color
                        </button>

                        <TextFieldGroup
                            placeholder="* Позиція в університеті"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            error={errors.status}
                            info="Наприклад:(Студент),(Декан Інфомаційного факультету)"
                            label="status"
                        />
                        <TextFieldGroup
                            placeholder="Рідне місто"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info="Рідне місто,село :(м.Івано-Франківськ)"
                            label="location"
                        />
                        <TextFieldGroup
                            placeholder="Ваше кредо"
                            name="credo"
                            value={this.state.credo}
                            onChange={this.onChange}
                            error={errors.credo}
                            info="Ваше кредо в житті"
                            label="credo"
                        />
                        <TextAreaFieldGroup
                            placeholder="Інформація про вас"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Коротка інформація про вас: захоплення,хоббі,навички"

                        />
                        <button
                            className={classnames('bth-hover btn-3 ', {'err-btn': errors.facebook || errors.twitter || errors.youtube || errors.linkedin || errors.instagram})}
                            name='displaySocialInputs' type="button"
                            onClick={this.onChangeModalWindow}>Edit Social
                        </button>
                        <button className="bth-hover btn-3 submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {clearErrors,createProfile})(withRouter(CreateProfile));