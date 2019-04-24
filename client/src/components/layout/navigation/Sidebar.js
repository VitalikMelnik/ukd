import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Sidebar = ({rootClass, data, auth_status, close_func, logout_func}) => {
    return (
        <div className={rootClass}>
            <div className='sidebar-header-buttons-root'>
                <button className='sidebar-header-button-close-burger' onClick={close_func}><span/><span/><span/>
                </button>
                <Link onClick={close_func} className='sidebar-header-button-support-button' to="/support"/>
            </div>
            {data}
            {auth_status ?
                (
                    <div className='sidebar-bottom-battons-body'>
                        <Link to="/" onClick={logout_func} className="sidebar-bottom-animated-button">Logout</Link>
                    </div>
                ) :
                (
                    <div className='sidebar-bottom-battons-body'>
                        <Link onClick={close_func} to="/register" className="sidebar-bottom-animated-button">Sign
                            up</Link>
                        <Link onClick={close_func} to="/login" className="sidebar-bottom-animated-button">Login</Link>
                    </div>
                )}
        </div>
    );
};

Sidebar.propTypes = {
    rootClass: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    auth_status: PropTypes.bool.isRequired,
    logout_func: PropTypes.func.isRequired,
    close_func: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
    type: 'text'
};


export default Sidebar;