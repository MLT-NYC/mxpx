import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(e) {
        e.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(e) {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {

        let rightItems;
        let navBarClassName;
        if (this.props.currentUser) {
            navBarClassName = 'profileNavBar';
            rightItems = (
                <div className='dropdownMenuContainer'>


                    <input type="text" className='search'/>

                    <div onClick={this.showMenu} className='dropdownMenuHeader'>
                        Show menu
                    </div>

                    {
                        this.state.showMenu
                        ? (
                            <>
                                <div className='dropdownMenuSquare'></div>
                                
                                <div className="dropdownMenu">
                                    <div className='dropdownMenuItem-1'>My profile</div>
                                    <div className='dropdownMenuItem-2'>My Stats</div>
                                    <div className='dropdownMenuItem-3'>My Galleries</div>
                                    <div className='dropdownMenuItem-4'>My liked pictures</div>
                                    <div className='dropdownMenuItem-5'>Manage pictures</div>
                                    <div className='dropdownMenuItem-6'>Memberships</div>
                                    <div className='dropdownMenuItem-7'>My Settings</div>
                                    <div className='dropdownMenuItem-8'>Support</div>
                                    <div className='dropdownMenuItem-9'>{this.props.navLink}</div>
                                </div>
                            </>
                        )
                        : (
                            null
                            )
                        }

                   
                    <div className='messageSendIcon'><i className="far fa-paper-plane"></i></div>
                    <div className='notificationIcon'><i className="far fa-bell"></i></div>
                    {/* <div className='pictureCreateIcon'><i className="fas fa-plus"></i></div> */}
                    <Link to='/pictures/new' onClick={this.props.toggleShowForm} className='pictureCreateIcon'><i className="fas fa-plus"></i></Link>
                
                </div>
            )
        } else {
            navBarClassName = 'sessionNavBar';
            rightItems = this.props.navLink;
        }

        return (
            <nav className={navBarClassName}>
                <Link to={'/'} className='sessionLogo'>mxpx</Link>
                <div className='sessionNav-left'>
                    <div className='navBar-session-item'>Discover</div>
                    <div className='navBar-session-item'>About</div>
                    <div className='navBar-session-item'>Studio</div>
                </div>

                <div className='sessionNav-right'>
                    <div className="rightItems">
                        {rightItems}
                    </div>
                </div>
            </nav>
        )
        
    }
}

export default NavBar;