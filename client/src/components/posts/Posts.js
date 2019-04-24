import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import InfiniteScroll from 'react-infinite-scroller';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import {getPosts} from '../../actions/postActions';
import '../../css/scope-over/index.css'


class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
        this.onGetMore = this.onGetMore.bind(this);
    }

    onGetMore() {
        this.setState({page: this.state.page + 1});
        this.props.getPosts(this.state.page);
    }

    componentDidMount() {
        this.props.getPosts(0);
    }

    render() {
        const {posts, loading, load_more} = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Spinner/>;
        } else {
            postContent = <PostFeed posts={posts}/>;
        }

        return (
            <div>
                <div className='question-header'>Scope<span> Overflow</span></div>
                <PostForm/>
                {postContent}
                {(load_more) ? <div onClick={this.onGetMore} className="container-loading">Load More</div> : null}
                <footer className='post-footer'/>
            </div>
        );
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
