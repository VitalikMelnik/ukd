import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {addLike, deletePost} from '../../actions/postActions';

class PostItem extends Component {
    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    render() {
        const {post, auth, showActions} = this.props;

        return (
            <div className='wow fadeInDown post-margin'>
                <div className='post-card-about'>
                    <img src={post.avatar} alt="avatar"/>
                    <p>{post.name}</p>
                </div>
                <div className='post-card-header'>
                    {showActions ? <p className="lead">{post.text.slice(0, 20) + '...'}</p> :
                        <p className="lead">{post.text}</p>}
                </div>
                <div className='post-card-tool'>
                    {Object.keys(auth.user).length > 0 ? (
                        <div className="row">
                            <div className="column">{(post.user === auth.user.id || auth.user.role === 'Admin') ? (
                                <div className='post-delete-btn'
                                     onClick={this.onDeleteClick.bind(this, post._id)}>delete</div>
                            ) : null}</div>
                            {showActions ? <div className="column">
                                <Link className='post-card-view' to={`/scope-overflow/${post._id}`}>View or replay</Link>
                            </div> : null}

                            <div className="column">
                                <div onClick={this.onLikeClick.bind(this, post._id)} className="stage">
                                    <div className={classnames('heart', {'is-active': this.findUserLike(post.likes)})}/>
                                    <p className='like-length'>{post.likes.length}</p>
                                </div>
                            </div>
                        </div>
                    ) : (showActions ? <div className="row">
                        <div className="column">
                            <Link className='post-card-view' to={`/scope-overflow/${post._id}`}>View</Link>
                        </div>
                    </div> : null)
                    }
                </div>
            </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike})(PostItem);
