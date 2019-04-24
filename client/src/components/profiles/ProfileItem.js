import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


class ProfileItem extends Component {
    render() {
        const {profile} = this.props;

        return (
            <div className="wow fadeInDown profile-list-item">
                <div>
                    <div>
                        <h3>{profile.name}</h3>

                        <img alt='img' src={profile.preview}/>

                        <Link to={`/profile/${profile.handle}`}>
                            View Profile
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
