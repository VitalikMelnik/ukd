import React from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';
import classnames from "classnames";

const ListFolders = ({folders, openFolderFunc, deleteFolderFunc, active_folder}) => {
    let selectOptions;

    if (folders.length > 0) {
        selectOptions = folders.map((folder, i) => (
            <div key={i} className={classnames('drive-folders-root', {'active-folder': active_folder === i})}
                 onClick={openFolderFunc.bind(this, i)}>
                <span className="drive-folders-folder-style"><span className="drive-folders-file-style"/></span>
                <div className="drive-folders-title-style">{folder.name}</div>
                <div className="drive-folders-del-btn-trash" onClick={deleteFolderFunc.bind(this, i)}/>
            </div>
        ));
    } else {
        selectOptions = null;
    }
    return (
        <div>
            {selectOptions}
        </div>
    );
};

ListFolders.propTypes = {
    folders: PropTypes.array.isRequired,
    openFolderFunc: PropTypes.func.isRequired,
    deleteFolderFunc: PropTypes.func.isRequired,
    active_folder: PropTypes.number.isRequired,
};

ListFolders.defaultProps = {
    type: 'text'
};

export default ListFolders;
