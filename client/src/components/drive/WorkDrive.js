import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getDriveByHandle} from '../../actions/driveActions';


class WorkDrive extends Component {
    constructor() {
        super();
        this.state = {
            drive: [{}],
            list: [],

            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getDriveByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.drive === null && this.props.drive.loading) {
            this.props.history.push('/not-found');
        }

        if (nextProps.drive.drive) {
            if (nextProps.drive.drive.folders.length > 0) {
                this.setState({
                    drive: nextProps.drive.drive.folders,
                    list: nextProps.drive.drive.folders[0].folder,
                });
            } else {
                this.setState({
                    drive: nextProps.drive.drive.folders,
                    list: [],
                });
            }
        }
    }

    render() {
        const {drive} = this.state;


        return (

            <div>
                {drive.toString()}
            </div>

        );
    }
}

WorkDrive.propTypes = {
    getDriveByHandle: PropTypes.func.isRequired,
    drive: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    drive: state.drive
});

export default connect(mapStateToProps, {getDriveByHandle})(WorkDrive);
