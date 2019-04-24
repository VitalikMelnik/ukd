import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteAccount, getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import AdminDashboard from '../admin/AdminDashboard';

//import ProfileActions from './ProfileActions';

// import styles
import '../../css/dashboard/root-grid.css';
import GridCell from "./GridCell";
// import Experience from './Experience';
// import Education from './Education';


// import some icons
import MyPage from "../../images/dashboard/my-profile.jpg";
import Blog from "../../images/dashboard/blog.jpg";
import Drive from "../../images/dashboard/drive.png";
import Delete from "../../images/dashboard/delete.jpg";
import Question from "../../images/dashboard/question.jpeg";
import classnames from "classnames";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide_welcome: false,
            hide_welcome2: true,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({hide_welcome: true})
        this.setState({hide_welcome2: false})
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {
        const {profile, loading} = this.props.profile;
        const {user} = this.props.auth;

        let drive;
        if (user.role === 'Teacher') {
            drive = (
                <GridCell class_status={'one-row--two-column'} img_link={Drive}
                          data={(
                              <div>
                                  <h4 className='dashboard-grid-cell-text'>Scope drive</h4>
                                  <div className='dashboard-grid-cell-link'>
                                      <Link className='dashboard-grid-cell-animated-button thar-four'
                                            to={`/drive`}>Work in drive</Link>
                                  </div>
                              </div>
                          )}/>
            )
        }


        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>;
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {

                if (user.role === 'User' || user.role === 'Teacher') {
                    dashboardContent = (
                        <div className='dashboard-content-root'>

                            <div className="dashboard-grid-wrapper">
                                <GridCell class_status={'two-row--two-column'} img_link={MyPage} data={(
                                    <div>

                                        <h4 className='dashboard-grid-cell-text'>Welcome: <span>{profile.name} </span> !
                                        </h4>
                                        <div className='dashboard-grid-cell-link'>
                                            <Link className='dashboard-grid-cell-animated-button thar-four'
                                                  to={`/profile/${profile.handle}`}>View profile</Link>
                                            <Link className='dashboard-grid-cell-animated-button thar-four'
                                                  to={`/edit-profile`}>Edit profile</Link>
                                            <Link className='dashboard-grid-cell-animated-button thar-four'
                                                  to={`/add-experience`}>Add or Edit Experience</Link>
                                        </div>

                                    </div>
                                )}/>

                                {drive}

                                <GridCell class_status={'two-row--two-column'} img_link={Blog}
                                          data={(
                                              <div>
                                                  <h4 className='dashboard-grid-cell-text'>Scope blog</h4>
                                                  <div className='dashboard-grid-cell-link'>
                                                      <Link className='dashboard-grid-cell-animated-button thar-four'
                                                            to={`/blog`}>Create post</Link>
                                                      <Link className='dashboard-grid-cell-animated-button thar-four'
                                                            to={`/blog-list`}>Scope Blog</Link>
                                                  </div>
                                              </div>
                                          )}/>
                                <GridCell class_status={'one-row--two-column'} img_link={Question}
                                          data={(
                                              <div>
                                                  <h4 className='dashboard-grid-cell-text'>Scope overflow</h4>
                                                  <div className='dashboard-grid-cell-link'>
                                                      <Link className='dashboard-grid-cell-animated-button thar-four'
                                                            to={`/scope-overflow`}>Try it</Link>
                                                  </div>
                                              </div>
                                          )}/>
                                <GridCell class_status={'one-row--two-column'} img_link={Delete}
                                          data={(
                                              <div className='delete-profile-btn'
                                                   onClick={this.onDeleteClick.bind(this)}>Delete My
                                                  Account</div>)}
                                />

                            </div>
                        </div>
                    );
                } else if (user.role === 'Admin') {
                    dashboardContent = (<AdminDashboard/>)
                }
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div className='root-content'>
                        <div className='welcome-page-after-animation'>
                            <div className='welcome-page-text'>
                                <b>Welcome Dear User!</b>
                                <p>You have not yet setup a profile, please add some info</p>
                            </div>
                            <Link to="/create-profile">
                                <div className="button">
                                    <span className="button__mask"/>
                                    <span className="button__text">Create Profile</span>
                                </div>
                            </Link>


                        </div>
                        <div className={classnames('welcome-page', {' welcome-page-hide': this.state.hide_welcome})}>
                            <div className="corner"/>
                            <div className="corner"/>
                            <div className="corner"/>
                            <div className="corner"/>
                            <div className="content">
                                <p data-shadow="WELCOME">
                                    <span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span>
                                </p>
                            </div>
                            <div className="right-vert-line"/>
                            <div className="left-vert-line"/>
                            <div onClick={this.onChange} className="continue">Let`s start</div>
                        </div>


                    </div>
                );
            }
        }

        return (

            <div>
                {dashboardContent}
            </div>

        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
