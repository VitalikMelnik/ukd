import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {getCurrentDrive} from '../../actions/driveActions';

// import styles
import '../../css/drive/index.css';






class DriveDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            some: false,

        };

    }

    componentDidMount() {
        this.props.getCurrentDrive();
    }




    render() {
        const {drive, loading} = this.props.drive;

        let dashboardContent;

        if (drive === null || loading) {
            dashboardContent = <Spinner/>;
        } else {
            if (Object.keys(drive).length > 0) {
                dashboardContent = (
                    <div className='dashboard-content-root'>
                        <div className='welcome-page-text'>
                            <b>Welcome Dear Theacher!</b>
                            <p>Work whith uour drive</p>
                        </div>
                        <Link to="/work_drive">
                            <div className="button">
                                <span className="button__mask"/>
                                <span className="button__text">Work in drive</span>
                            </div>
                        </Link>
                    </div>
                );
            } else {
                dashboardContent = (
                    <div className='root-content'>
                        <div className='welcome-page-text'>
                            <b>Welcome Dear Theacher!</b>
                            <p>Create drive</p>
                        </div>
                        <Link to="/create_drive">
                            <div className="button">
                                <span className="button__mask"/>
                                <span className="button__text">Create drive</span>
                            </div>
                        </Link>
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

DriveDashboard.propTypes = {
    getCurrentDrive: PropTypes.func.isRequired,
    drive: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    drive: state.drive,
});

export default connect(mapStateToProps, {getCurrentDrive})(DriveDashboard);



