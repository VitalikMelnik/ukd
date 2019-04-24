import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';

import Spinner from '../common/Spinner';
import {getProfileByHandle} from '../../actions/profileActions';
import '../../css/profile/profile.css'

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }

    render() {
        const {profile, loading} = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner/>;
        } else {
            profileContent = (
                <div>
                    <ProfileHeader profile={profile}/>


                </div>
            );
        }

        return (

            <div>
                <div>{profileContent}</div>
            </div>

        );
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
