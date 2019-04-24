import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExperience} from '../../actions/profileActions';
import ExperienceFeed from "./ExperienceFeed";

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: [],
            name: '',
            info: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

    }

    onSubmit(e) {
        e.preventDefault();

        const expData = {
            name: this.state.name,
            info: this.state.info,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addExperience(expData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({errors: {...this.state.errors, [e.target.name]: ''}});
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render() {
        const {errors, disabled} = this.state;
        const {profile} = this.props.profile;

        return (
            <div>
                <div className="add-experience">
                    <div className='add-experience-header'>
                        <h1>Add more information</h1>
                        <p>Add any job or position that you have had in the past or current, or courses you have been
                            undergoing</p>
                    </div>
                    <div className='add-experience-form'>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="* Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                error={errors.name}
                                info="Name of experience"
                                label="Name"
                            />
                            <TextFieldGroup
                                placeholder="* Experience Info"
                                name="info"
                                value={this.state.info}
                                onChange={this.onChange}
                                error={errors.info}
                                info="Title of experience"
                                label="Info"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Place where you have gained experience"
                                label="Location"
                            />
                            <TextFieldGroup
                                name="from"
                                type="date"
                                value={this.state.from}
                                onChange={this.onChange}
                                error={errors.from}
                                label="From"
                            />
                            {!disabled ?
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    label="To"/> : null}

                            <div className='add-experience-form-checkbox'>
                                Current Job or experience
                                <label className="container-anonymously-checkbox">
                                    <input name="current"
                                           type="checkbox"
                                           value={this.state.current}
                                           checked={this.state.current}
                                           onChange={this.onCheck}
                                           id="current"
                                           className="anonymously-checkbox"
                                    />
                                    <div className="anonymously-checker"/>
                                    <div className="anonymously-dot"/>
                                </label>
                            </div>

                            <TextAreaFieldGroup
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info="Tell us about the the position"
                                label="Tell us about"
                            />
                            <button className="bth-hover btn-3 submit-btn" type="submit">Create</button>
                        </form>
                    </div>
                    <div className='add-experience-list'>
                        {Object.keys(profile).length > 0 ? profile.experience.length > 0 ?
                            <ExperienceFeed posts={profile.experience}/> : null : null}
                    </div>
                </div>
            </div>


        );
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));
