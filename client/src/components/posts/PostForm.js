import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postActions';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anonymously: false,
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {user} = this.props.auth;
        let newPost = {};

        if (Object.keys(user).length > 0) {
            const {profile} = this.props.profile;
            newPost = {
                text: this.state.text,
                name: profile.name,
                avatar: profile.preview,
                user: user.id,
                anonymously: this.state.anonymously,
            };
        } else {
            newPost = {
                text: this.state.text,
                anonymously: true,
            };
        }
        this.props.addPost(newPost);
        this.setState({text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value, errors: {}});
    }

    onChangeInput(e) {
        this.setState({[e.target.name]: !this.state[e.target.name], errors: {}});
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const {errors} = this.state;

        return (
            <div className='form-create-question'>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div className='form-header-question'>
                            You can ask your question anonymously if you are worried about something.
                        </div>
                        <TextAreaFieldGroup
                            placeholder="Ask question"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            error={errors.text}
                        />
                        <div className='anonymously-checkbox-root'>
                            {isAuthenticated ?
                                <div>
                                    Create a question anonymously
                                    <label className="container-anonymously-checkbox">
                                        <input name="anonymously"
                                               type="checkbox"
                                               value={this.state.anonymously}
                                               onChange={this.onChangeInput}
                                               className="anonymously-checkbox"
                                        />
                                        <div className="anonymously-checker"/>
                                        <div className="anonymously-dot"/>

                                    </label>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <button className='sub-btn-qu' type="submit">Ask</button>
                </form>
            </div>

        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addPost})(PostForm);
