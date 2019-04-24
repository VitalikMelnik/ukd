import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';
import {Preloader, Placeholder} from 'react-preloading-screen';
import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import PrivateRouterAdmin from './components/common/PrivateRouterAdmin';
import PrivateRouteTeacher from './components/common/PrivateRouteTeacher';

import Drive from './components/drive/DriveDashboard'
import CreateDrive from './components/drive/CreateDrive'
import WorkDrive from './components/drive/work-in-drive/WorkInDrive'
import VisibleDrive from './components/drive/WorkDrive'


import Admin from './components/admin/AdminDashboard'


import Particle from './components/common/Particle';
import Navbar from './components/layout/navigation/NavigationRoot';
import Landing from './components/layout/Landing';
import AboutUs from './components/layout/AboutUs';
import Register from './components/auth/Register';
import Support from './components/layout/Support';
import Login from './components/auth/Login';
import Success from './components/auth/SuccessChekEmail';
import RestorePassword from './components/auth/RestorePassword';
import RestorePasswordId from './components/auth/RestorePasswordId';
import Dashboard from './components/dashboard/Dashboard';
import BlogForm from './components/blog/BlogForm';
import Blogs from './components/blog/Blogs';
import Blog from './components/blog/Blog';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';


import './css/reset.css';
import './css/App.css';

import WOW from 'wow.js'

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = '/';
    }
}

class App extends Component {
    componentDidMount() {
        const wow = new WOW();
        wow.init();
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Preloader>
                        <div className="App">

                            <Particle/>
                            <Navbar/>

                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/about_us" component={AboutUs}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/support" component={Support}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/success" component={Success}/>
                            <Route exact path="/restore_password" component={RestorePassword}/>
                            <Route exact path="/restore_password/:id" component={RestorePasswordId}/>
                            <Route exact path="/profile/:handle" component={Profile}/>
                            <Route exact path="/profiles" component={Profiles}/>

                            <Route exact path="/scope-overflow" component={Posts}/>
                            <Route exact path="/scope-overflow/:id" component={Post}/>
                            <Route exact path="/blog-list" component={Blogs}/>
                            <Route exact path="/blog/:id" component={Blog}/>
                            <Route exact path="/drive/:handle" component={VisibleDrive}/>


                            <Switch>
                                <PrivateRouteTeacher exact path="/drive" component={Drive}/>
                            </Switch>
                            <Switch>
                                <PrivateRouteTeacher exact path="/work_drive" component={WorkDrive}/>
                            </Switch>
                            <Switch>
                                <PrivateRouteTeacher exact path="/create_drive" component={CreateDrive}/>
                            </Switch>

                            <Switch>
                                <PrivateRouterAdmin exact path="/admin" component={Admin}/>
                            </Switch>

                            <Switch>
                                <PrivateRoute exact path="/blog" component={BlogForm}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                            </Switch>


                            <Route exact path="/not-found" component={NotFound}/>


                        </div>

                        <Placeholder fadeDuration={2000}>
                            <div id="preloader">
                                <span/>
                                <span/>
                                <span/>
                                <p>LOADING</p>
                            </div>
                        </Placeholder>
                    </Preloader>
                </Router>
            </Provider>
        );
    }
}

export default App;
