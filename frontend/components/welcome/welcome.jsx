import React from 'react';
import { Link } from 'react-router-dom';
import ProfileContainer from '../profile/profile_container';
import backgroundImage from '../../../app/assets/images/amazon-jungle.jpg';
// Welcomr component
class Welcome extends React.Component {

    render() {

        if (this.props.currentUser){
            return (
                <ProfileContainer />
            );
        } else {
            return (
                <>
                    <div className='welcomeHeader'>
                        <img className='headerImage' src={backgroundImage}>
                        </img>

                        <nav className='navBar'>
                            <h1 className='logo'>mxpx</h1>

                            <div className='nav-left'>
                            </div>

                            <div className='nav-right'>
                                <div className='welcomeButtons'>
                                    <Link to={'/login'} className='logInButton'>Log in</Link>
                                    <Link to={'/signup'} className='signUpButton'>Sign up</Link>
                                </div>
                            </div>

                        </nav>

                        <div className="welcomeMessages">
                            <h1 className='titleMessage'>Get inspired and share your best photos</h1>
                            <h3 className='subtitleMessage'>Find your home among the world's best photographers</h3>
                            <Link to={'/login'} className='joinButton'>Join mxpx</Link>
                        </div>
                    </div>


                </>
            )
        };

    }
}

export default Welcome;
