import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addLike, deleteBlog} from '../../actions/blogActions';
import classnames from "classnames";
import {Link} from "react-router-dom";
import '../../css/blogs-page/blog-list.css'
import comment from '../../images/comment-length.png'
import view from '../../images/view.png'


class BlogItem extends Component {


    onDeleteClick(id) {
        this.props.deleteBlog(id);
    }

    onClickLike(id) {
        this.props.addLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    render() {
        const {post, auth} = this.props;

        return (
            <div className="wow fadeInDown card">

                <header className="card__thumb">
                    <img alt='cart img' src={post.img_href}/>
                </header>
                <div className="card__date">
                    <span className="card__date__day">{post.date.slice(0, 4)}</span>
                    <br/>
                    <span className="card__date__month">{post.date.slice(5, 7)}</span>
                </div>

                <div className="card__body">
                    <div className="card__category">{post.tags} </div>
                    <img className='card__img-avatar' src={post.avatar} alt='img avatar'/>
                    <h2 className="card__title">{post.name}</h2>
                    <div className="card__subtitle">{post.header}</div>

                    <div className='card__description'>
                        <Link to={`/blog/${post._id}`}>
                            <div className="learn-more">
                                <div className="circle">
                                    <span className="icon arrow"/>
                                </div>
                                <p className="button-text">Read More</p>
                            </div>
                        </Link>
                        <p>Time reading: {post.time_reading} minutes</p>
                    </div>

                </div>


                <div className='row card-footer'>

                    <div className='column'>
                        {(auth.isAuthenticated) ?
                            (<div onClick={this.onClickLike.bind(this, post._id)}
                                  className={classnames('heart heart-blog-list', {'is-active': this.findUserLike(post.likes)})}/>) :
                            (<div className='heart heart-blog-list'/>)}
                        <p className='comment-card-num'>{post.likes.length}</p>
                    </div>
                    <div className='column'>
                        <img className='comment-card-img' src={comment} alt='comment svg'/>
                        <p className='comment-card-num'>{post.comments.length}</p>
                    </div>
                    <div className='column'>
                        <img className='comment-card-img' src={view} alt='view svg'/>
                        <p className='comment-card-num'>{post.view_count}</p>
                    </div>


                    {(post.user === auth.user.id || auth.user.role === 'Admin') ? (
                        <div className="column">
                            <div className='post-delete-btn'
                                 onClick={this.onDeleteClick.bind(this, post._id)}>delete
                            </div>
                        </div>
                    ) : null}

                </div>

            </div>
        )
    }

}

BlogItem.defaultProps = {
    showActions: true,
};

BlogItem.propTypes = {
    deleteBlog: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,

});

export default connect(mapStateToProps, {deleteBlog, addLike})(BlogItem);
