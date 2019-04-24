import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../../actions/authActions';
import {clearCurrentProfile,getCurrentProfile} from '../../../actions/profileActions';
import classnames from 'classnames';
import Logo from './Logo'
import Sidebar from './Sidebar'

// import styles
import '../../../css/header/logo.css';
import '../../../css/header/nav.css';
import '../../../css/header/sidebar.css';

// import some icons
import Home from "../../../images/navigation-icon/navigation-icon-home.png";
import About from "../../../images/navigation-icon/navigation-icon-about.png";
import User from "../../../images/navigation-icon/navigation-icon-user.png";
import Blog from "../../../images/navigation-icon/navigation-icon-blog.png";
import Dashboard from "../../../images/navigation-icon/navigation-icon-dashboard.png";
import Question from "../../../images/navigation-icon/navigation-icon-question.png";


class NavigationRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header_status: false,
            menu_status: false,
            defaultScrollY: 0,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({menu_status: !this.state.menu_status});
        this.setState({header_status: !this.state.header_status});
    };

    handleScroll() {
        if (window.pageYOffset > this.state.defaultScrollY) {
            this.setState({header_status: true, menu_status: false, defaultScrollY: window.pageYOffset});
        } else {
            this.setState({header_status: false, menu_status: false, defaultScrollY: window.pageYOffset});
        }
    }

    componentDidMount() {
        this.props.getCurrentProfile();
        window.addEventListener('scroll', this.handleScroll);
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.onChange();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user,} = this.props.auth;
        const {profile} = this.props.profile;
        const {header_status, menu_status} = this.state;

        const authLinks = (
            <div className='sidebar-list-body'>
                <div className='sidebar-list-body-avatar'>
                    <img className='sidebar-avatar-img' src={profile.preview} alt='avatar'/>
                </div>

                <div className='sidebar-list-body-info'>
                    <h3 className='sidebar-info-name'>{profile.name}</h3>
                    <h3 className='sidebar-info-email'>{user.email}</h3>
                </div>
                <ul className='sidebar-navigation-body'>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/scope-overflow">
                            Post Feed
                            <img className='sidebar-link-icon-animation' src={Question} alt='icon-question'/>
                        </Link>
                    </li>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/dashboard">
                            Dashboard
                            <img className='sidebar-link-icon-animation' src={Dashboard} alt='icon-dashboard'/>
                        </Link>
                    </li>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/blog-list">
                            Blog
                            <img className='sidebar-link-icon-animation' src={Blog} alt='icon-blog'/>
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const guestLinks = (
            <div className='sidebar-list-body'>
                <ul className='sidebar-navigation-body'>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/">
                            Home
                            <img className='sidebar-link-icon-animation' src={Home} alt='icon-home'/>
                        </Link>
                    </li>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/about_us">
                            About us
                            <img className='sidebar-link-icon-animation' src={About} alt='icon-about'/>
                        </Link>
                    </li>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/scope-overflow">
                          Overflow
                            <img className='sidebar-link-icon-animation' src={User} alt='icon-users'/>
                        </Link>
                    </li>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/blog-list">
                            Blog
                            <img className='sidebar-link-icon-animation' src={Blog} alt='icon-blog'/>
                        </Link>
                    </li>
                    <li>
                        <Link className='sidebar-link-animation' onClick={this.onChange} to="/profiles">
                            Profiles
                            <img className='sidebar-link-icon-animation' src={Dashboard} alt='icon-blog'/>
                        </Link>
                    </li>
                </ul>
            </div>
        );

        return (
            <div>
                <nav id='nav' className={classnames('navigation-root-show', {'navigation-root-hide': header_status})}>
                    <div className="navigation-content">
                        <Logo/>
                        <button onClick={this.onChange} className="navigation-burger"><span/></button>
                    </div>
                </nav>
                <Sidebar auth_status={!!isAuthenticated} logout_func={this.onLogoutClick.bind(this)}
                         close_func={this.onChange}
                         data={isAuthenticated ? authLinks : guestLinks}
                         rootClass={classnames('sidebar', {'sidebar-active': menu_status})}/>
            </div>
        );
    }
}

NavigationRoot.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile,logoutUser, clearCurrentProfile})(NavigationRoot);
