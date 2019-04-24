import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '../../css/common/modal.css'


const ModalWindow = ({value, name, content, onChange}) => {
    return (

        <div className={classnames('modal-window', {'modal-window-hide': value})}>
            <div className='modal-window-content'>
                {content}
                <button name={name} type="button" onClick={onChange} className="modal-window-button">Okay</button>
            </div>
        </div>
    );
};

ModalWindow.propTypes = {
    content: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    name: PropTypes.string,
};

ModalWindow.defaultProps = {
    type: 'text'
};

export default ModalWindow;
