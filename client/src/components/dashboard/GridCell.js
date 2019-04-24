import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const GridCell = ({class_status, img_link, data}) => {
    const styles = {
        bgImage: {
            backgroundImage: "url(' " + img_link + "')"
        }
    };

    return (
        <div style={styles.bgImage} className={classnames('dashboard-grid-cell', class_status)}>
            <div className='dashboard-grid-hide-cell'>
                {data}
            </div>
        </div>

    );
};

GridCell.propTypes = {
    class_status: PropTypes.string.isRequired,
    img_link: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,

};

GridCell.defaultProps = {
    type: 'text'
};

export default GridCell;
