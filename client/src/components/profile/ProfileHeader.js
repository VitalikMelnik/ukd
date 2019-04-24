import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';
import {SocialIcon} from 'react-social-icons';
import ProfileCreds from './ProfileCreds';

class ProfileHeader extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div>
                <div className="grup-content">
                    <div className="cover-profile">
                        <div className="image-paralax"/>
                        <div className="profile">
                            <div className='row'>
                                <div className='column'>
                                    <img className='profile-img' src={profile.preview} alt="profile img"/>
                                </div>
                                <div className='column profile-text'>
                                    <h2>{profile.name}</h2>
                                    <p>@{profile.handle}</p>
                                    {profile.status}{' '}
                                    from : {isEmpty(profile.location) ? null : <div>{profile.location}</div>}
                                </div>
                            </div>

                        </div>
                        <div className='profile-credo-content'>
                            <h3 className='profile-text-center'>User credo</h3>
                            {isEmpty(profile.credo) ? (
                                <span className='user-credo-text'> does not have a credo</span>
                            ) : (
                                <span className='user-credo-text'>{profile.credo}</span>
                            )}
                        </div>
                        <div className='profile-credo-content'>
                            <h3 className='profile-text-center'>User bio</h3>
                            {isEmpty(profile.bio) ? (
                                <span className='user-credo-text'> does not have a bio</span>
                            ) : (
                                <span className='user-credo-text'>{profile.bio}</span>
                            )}
                        </div>
                        <div className='profile-social-content'>
                            <h3 className='profile-text-center'>Social</h3>
                            {isEmpty(profile.social && profile.social.twitter) ? null : (
                                <SocialIcon target="_blank" style={{margin: 10}} fgColor="#ffffff" bgColor="#182a78"
                                            url={profile.social.twitter}/>)}
                            {isEmpty(profile.social && profile.social.facebook) ? null : (
                                <SocialIcon target="_blank" style={{margin: 10}} fgColor="#ffffff" bgColor="#182a78"
                                            url={profile.social.facebook}/>)}
                            {isEmpty(profile.social && profile.social.linkedin) ? null : (
                                <SocialIcon target="_blank" style={{margin: 10}} fgColor="#ffffff" bgColor="#182a78"
                                            url={profile.social.linkedin}/>)}
                            {isEmpty(profile.social && profile.social.youtube) ? null : (
                                <SocialIcon target="_blank" style={{margin: 10}} fgColor="#ffffff" bgColor="#182a78"
                                            url={profile.social.youtube}/>)}
                            {isEmpty(profile.social && profile.social.instagram) ? null : (
                                <SocialIcon target="_blank" style={{margin: 10}} fgColor="#ffffff" bgColor="#182a78"
                                            url={profile.social.instagram}/>)}
                        </div>
                        <ProfileCreds
                            experience={profile.experience}
                        />
                    </div>
                </div>

            </div>

        );
    }
}

export default ProfileHeader;
