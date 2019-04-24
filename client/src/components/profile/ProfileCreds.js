import React, {Component} from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
    render() {
        const {experience} = this.props;
        let expItems;
        if (experience) {
            expItems = experience.map(exp => (
                <li key={exp._id} className="exp-list-item">
                    <h4>{exp.name}</h4>
                    <p>
                        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                        {exp.to === null ? (
                            ' Now'
                        ) : (
                            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                        )}
                    </p>
                    <p>{exp.info}</p>
                    <p>
                        {exp.location === '' ? null : (
                            <span>
              <strong>Location: </strong> {exp.location}
            </span>
                        )}
                    </p>
                    <p>
                        {exp.description === '' ? null : (
                            <span>
              <strong>Description: </strong> {exp.description}
            </span>
                        )}
                    </p>
                </li>
            ));
        } else {
            expItems = (<p>No Experience Listed</p>);
        }
        return (
            <div className="exp-list">
                <h3 className='profile-text-center'>Experience</h3>
                <ul className="list-group">{expItems}</ul>

            </div>
        );
    }
}

export default ProfileCreds;
