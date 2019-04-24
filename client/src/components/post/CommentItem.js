import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postActions';

class CommentItem extends Component {
    onDeleteClick(postId, commentId) {
        this.props.deleteComment(postId, commentId);
    }

    render() {
        const {comment, postId, auth} = this.props;

        return (
            <div className='wow fadeInDown comment-item'>
                <div className='row'>
                    <div className='column'>
                        <img className='comment-avatar' alt='comment avatar' src={comment.avatar}/>
                        <p className="comment-name">{comment.name}</p>
                    </div>
                    <div className='column'>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                    {Object.keys(auth.user).length > 0 ? (
                        <div className='column'>
                            {(comment.user === auth.user.id || auth.user.role === 'Admin') ? (
                                <div className='post-delete-btn'
                                     onClick={this.onDeleteClick.bind(this, postId, comment._id)}>Delete</div>) : null}
                        </div>) : null}
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
