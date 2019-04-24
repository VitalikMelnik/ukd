import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ListItem = ({items, view, deletitem}) => {
    let selectOptions;

    if (items.length > 0) {

        selectOptions = items.map((item, i) => (
            <li key={i}>
                <div className={classnames('icon_type_file',
                    {'icon-blue': +item.type === 1},
                    {'icon-green': +item.type === 2},
                    {'icon-yellow': +item.type === 3},
                    {'icon-red': +item.type === 4})}><p className='list-item-text'>{item.name}</p></div>

                <Link target='_blank' to={item.link}>
                    <div className='drive-list-btn'>Link</div>
                </Link>
                <div className='drive-list-btn' onClick={deletitem.bind(this, i)}>delet</div>
            </li>
        ));
    } else {
        selectOptions = null;
    }

    return (
        <div>

            <ol className={classnames('list', {'list-view-filter': !view}, {'grid-view-filter': view})}>
                {selectOptions}
            </ol>
        </div>
    );
};

ListItem.propTypes = {
    items: PropTypes.array.isRequired,
    view: PropTypes.bool.isRequired,
    deletitem: PropTypes.func.isRequired,

};

ListItem.defaultProps = {
    type: 'text'
};

export default ListItem;
