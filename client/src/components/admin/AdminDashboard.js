import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import GridCell from "../dashboard/GridCell";


import MyPage from "../../images/dashboard/my-profile.jpg";
import Blog from "../../images/dashboard/blog.jpg";
// import Drive from "../../images/dashboard/drive.png";
// import Delete from "../../images/dashboard/delete.jpg";
import Question from "../../images/dashboard/question.jpeg";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            some: false,

        };

    }


    render() {
        // const {profile, loading} = this.props.profile;


        return (

            <div>
                <div className='dashboard-content-root'>

                    <div className="dashboard-grid-wrapper">
                        <GridCell class_status={'one-row--two-column'} img_link={MyPage} data={(
                            <div>
                                <div className='dashboard-grid-cell-link'>
                                    <Link className='dashboard-grid-cell-animated-button thar-four'
                                          to={`/edit-profile`}>Edit profile</Link>
                                </div>
                            </div>
                        )}/>
                        <GridCell class_status={'one-row--two-column'} img_link={Blog} data={(
                            <div>
                                <div className='dashboard-grid-cell-link'>
                                    <Link className='dashboard-grid-cell-animated-button thar-four'
                                          to={`/blog-list`}>Edit Scope BLog</Link>
                                </div>

                            </div>
                        )}/>
                        <GridCell class_status={'one-row--two-column'} img_link={Question} data={(
                            <div>
                                <div className='dashboard-grid-cell-link'>
                                    <Link className='dashboard-grid-cell-animated-button thar-four'
                                          to={`/scope-overflow`}>Edit ScopeOverflow</Link>
                                </div>

                            </div>
                        )}/>

                    </div>
                </div>


            </div>

        );
    }
}

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {})(AdminDashboard);



