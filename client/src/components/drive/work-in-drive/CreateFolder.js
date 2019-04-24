import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CreateFolder = ({status, value_folder_name, onChangeFunc, createFolderFunc, closeFolderFunc, error}) => {
    return (
        <div className={classnames('hide-create-folder', {'show-create-folder': status})}>
            <input placeholder='Name folder' className='create-folder-input' name='name_folder'
                   value={value_folder_name} type='text' onChange={onChangeFunc}/>

            <button className='create-folder-button' onClick={createFolderFunc}>add</button>
            <button className='create-folder-button' onClick={closeFolderFunc}>cansel</button>
            <p className='create-folder-err'>{error}</p>
        </div>
    );
};

CreateFolder.propTypes = {
    status: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onChangeFunc: PropTypes.func.isRequired,
    closeFolderFunc: PropTypes.func.isRequired,
    createFolderFunc: PropTypes.func.isRequired,
    value_folder_name: PropTypes.string.isRequired,
};

CreateFolder.defaultProps = {
    type: 'text'
};

export default CreateFolder;
