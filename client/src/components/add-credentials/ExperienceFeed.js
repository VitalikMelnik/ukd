import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExperienceItem from './ExperienceItem';

class ExperienceFeed extends Component {
    render() {
        const {posts} = this.props;
        return posts.map(post => (
            <ExperienceItem key={post._id} body={post}/>
        ));
    }
}

ExperienceFeed.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default ExperienceFeed;
