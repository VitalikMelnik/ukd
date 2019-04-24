import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addComment} from '../../actions/postActions';

class CommentForm extends Component {
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
        const {postId} = this.props;

        let newComment = {};

        if (Object.keys(user).length > 0) {
            const {profile} = this.props.profile;
            newComment = {
                text: this.state.text,
                name: profile.name,
                avatar: profile.preview,
                user: user.id,
                anonymously: this.state.anonymously,
            };
        } else {
            newComment = {
                text: this.state.text,
                anonymously: true,
            };
        }
        this.props.addComment(postId, newComment);
        this.setState({text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value, errors: {}});
    }

    onChangeInput(e) {
        this.setState({[e.target.name]: !this.state[e.target.name],errors: {}});
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const {errors} = this.state;

        return (
            <div className='form-create-question'>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <TextAreaFieldGroup
                            placeholder="Answer question"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            error={errors.text}
                        />
                        <div className='anonymously-checkbox-root'>
                            {isAuthenticated ?
                                <div>
                                    Answer a question anonymously
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
                                </div> : null}
                        </div>
                    </div>
                    <button className='sub-btn-qu' type="submit">Answer</button>
                </form>
            </div>
        );
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile,
});

export default connect(mapStateToProps, {addComment})(CommentForm);
