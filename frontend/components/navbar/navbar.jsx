import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <nav className='sessionNavBar'>
                <Link to={'/'} className='sessionLogo'>mxpx</Link>
                <div className='sessionNav-left'>
                    <div className='navBar-session-item'>Discover</div>
                    <div className='navBar-session-item'>About</div>
                    <div className='navBar-session-item'>Studio</div>
                </div>

                <div className='sessionNav-right'>
                    {/* <div className='sessionSearch'>
                                    </div> */}
                    <div>
                        {this.props.navLink}
                    </div>
                </div>
            </nav>
        )
        
    }
}

export default NavBar;