import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlogItem from './BlogItem';


class BlogFeed extends Component {
    render() {
        const { posts } = this.props;

        return posts.map(post =>  <BlogItem key={post._id} post={post} />);
    }
}

BlogFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default BlogFeed;
