import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteExperience} from '../../actions/profileActions';

class ExperienceItem extends Component {
    onDeleteClick(postId) {
        this.props.deleteExperience(postId);
    }

    render() {
        const {body} = this.props;

        return (
            <div className='wow fadeInDown experience-item'>
                <div className='row'>
                    <div className='column'>
                        <p className="comment-name">{body.name}</p>
                    </div>
                    <div className='column'>
                        <div className='post-delete-btn' onClick={this.onDeleteClick.bind(this, body._id)}>Delete</div>
                    </div>
                </div>
            </div>
        );
    }
}

ExperienceItem.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
    body: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteExperience})(ExperienceItem);
