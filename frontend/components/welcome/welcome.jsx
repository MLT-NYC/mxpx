import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {

    componentDidMount() {

    }

    render() { 

        if (this.props.currentUser){
            return (
                <div>
                    <h4>Welcome, {this.props.currentUser.email}</h4>
                    <button onClick={this.props.logOut}>Log out</button>
                </div>
            );
        } else {
            return (
                <>
                    
                    <nav className='navBar'>
                        
                        <div className='nav-left'>
                            <h1 className='logo'>mxpx</h1>
                            <div className='navBar-splash'>Discover</div>
                            <div className='navBar-splash'>Licensing</div>
                            <div className='navBar-splash'>Memberships</div>
                            <div className='navBar-splash'>Quests</div>
                            <div className='navBar-splash'>Studio</div>
                            <div className='navBar-splash'>Blog</div>
                        </div>

                        <div className='nav-right'>
                            <Link to={'/login'} className='logInButton'>Log in</Link>
                            <Link to={'/signup'} className='signUpButton'>Sign up</Link>
                        </div>

                    </nav>

                    <div className='headerImage'></div>

                </>
            )
        };

    }
}

export default Welcome;