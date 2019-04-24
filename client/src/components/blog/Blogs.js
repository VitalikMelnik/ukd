import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import BlogFeed from './BlogFeed';
import Spinner from '../common/Spinner';
import {getBlogs} from '../../actions/blogActions';

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({page: this.state.page + 1});
        this.props.getBlogs(this.state.page);
    }

    componentDidMount() {
        this.props.getBlogs(0);
    }

    render() {
        const {blogs, load_more, loading} = this.props.blog;
        let postContent;


        if (blogs === null || loading) {
            postContent = <Spinner/>;
        } else {
            postContent = <BlogFeed posts={blogs}/>;
        }

        return (
            <div>
                <div className='question-header'>Scope<span> Blog</span></div>
                {postContent}
                {(load_more) ? <div onClick={this.onClick} className="container-loading">Load More</div> : null}
            </div>
        );
    }
}

Blogs.propTypes = {
    getBlogs: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, {getBlogs})(Blogs);
