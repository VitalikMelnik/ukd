import React from 'react';

import PropTypes from 'prop-types';

const TagsEditor = ({array,delete_index}) => {
    const listItems = array.map((name, index) => <p className='tag' onClick={delete_index.bind(this ,index)} key={index}>{name}</p>);
    return (
        <div >
            <ul>
                {listItems}
            </ul>
        </div>
    );
};

TagsEditor.propTypes = {
    array: PropTypes.array.isRequired,
    delete_index: PropTypes.func.isRequired
};

TagsEditor.defaultProps = {
    type: 'text'
};

export default TagsEditor;
