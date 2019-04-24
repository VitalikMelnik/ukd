import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import cloud from '../../images/backround/cloud1.png'
import cloud2 from '../../images/backround/cloud2.png'
import cloud3 from '../../images/backround/cloud3.jpg'


class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <div className='home-page-root-content'>
                    <img className='home-page-cloud-animation' src={cloud} alt='backround png img'/>
                    <img className='home-page-cloud-animation' src={cloud2} alt='backround png img'/>
                    <img className='home-page-cloud-animation' src={cloud3} alt='backround png img'/>
                    <Link to='/about_us'>
                        <button className='home-page-button'>Let`s start</button>
                    </Link>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
