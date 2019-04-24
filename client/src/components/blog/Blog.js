import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {addLike, getPost} from '../../actions/blogActions';
import classnames from "classnames";
import '../../css/blogs-page/blog.css'
import '../../css/blogs-page/blog-style-default.css'
import comment from "../../images/comment-length.png";
import view from "../../images/view.png";
import clock from "../../images/clock.png";


class Blog extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    onClickSentSpan(id) {
        this.props.addSpan(id);
    }

    onClickLike(id) {
        this.props.addLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    render() {
        const {blog, loading} = this.props.blog;

        let postContent;

        if (blog === null || loading || Object.keys(blog).length === 0) {
            postContent = <Spinner/>;
        } else {

            const img = 'url("' + blog.img_href + '") no-repeat';
            const divStyle = {
                background: img,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
            };
            postContent = (
                <div>
                    <div style={divStyle} className="diagonal">
                        <h2>{blog.header}</h2>
                    </div>
                    <div className="container">
                        <div className='fixed-navbar'>
                            <div className='fixed-navbar-row'>
                                <p>{blog.likes.length}</p>
                                <div className='like-card' onClick={this.onClickLike.bind(this, blog._id)}>
                                    <div
                                        className={classnames('heart heart-in-blog', {'is-active': this.findUserLike(blog.likes)})}/>
                                </div>
                            </div>
                            <div className='fixed-navbar-row'>
                                <p>{blog.comments.length}</p>
                                <img className='section-img' src={comment} alt='comment svg'/>
                            </div>
                            <div className='fixed-navbar-row'>
                                <p>{blog.view_count}</p>
                                <img className='section-img' src={view} alt='view svg'/>

                            </div>
                            <div className='fixed-navbar-row'>
                                <p>{blog.time_reading}</p>
                                <img className='section-img' src={clock} alt='view svg'/>
                            </div>
                            <div className='fixed-navbar-row'>
                                <Link to="/blog-list">
                                    <div className='back-hover'>Back</div>
                                </Link>
                            </div>
                        </div>
                        <div className='center-blog-text'>
                            <h3 className='blog-header'>{blog.name}</h3>
                            <div dangerouslySetInnerHTML={{__html: blog.data}}/>
                        </div>

                    </div>
                </div>
            );
        }

        return (
            <div>
                {postContent}


            </div>
        );
    }
}

Blog.propTypes = {
    getPost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    blog: state.blog,
    auth: state.auth,
});

export default connect(mapStateToProps, {getPost, addLike})(Blog);
