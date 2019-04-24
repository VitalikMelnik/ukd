import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updatePassword} from "../../actions/authActions";
import Spinner from '../common/Spinner'

class RestorePasswordId extends Component {
    componentDidMount() {
        this.props.updatePassword(this.props.match.params.id,this.props.history);
    }

    render() {
        return (
            <div>
                <Spinner/>
            </div>
        );
    }
}

RestorePasswordId.propTypes = {
    updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {updatePassword})(RestorePasswordId);
