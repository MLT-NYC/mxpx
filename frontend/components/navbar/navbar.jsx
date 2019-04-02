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
        if (!this.dropdownMenu.contains(e.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        let rightItems;
        if (this.props.currentUser) {
            rightItems = (
                <div>
                    <div onClick={this.showMenu}>
                        Show menu
                    </div>

                    {
                        this.state.showMenu
                        ? (
                            <div 
                                className="dropdownMenu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                        >
                                <div className='dropdownMenuItem'>My profile</div>
                                <div className='dropdownMenuItem'>My Stats</div>
                                <div className='dropdownMenuItem'>My Galleries</div>
                                <div className='dropdownMenuItem'>My liked pictures</div>
                                <div className='dropdownMenuItem'>Manage pictures</div>
                                <div className='dropdownMenuItem'>Memberships</div>
                                <div className='dropdownMenuItem'>My Settings</div>
                                <div className='dropdownMenuItem'>Support</div>
                                <div className='dropdownMenuItem'>{this.props.navLink}</div>
                            </div>
                        )
                        : (
                            null
                        )
                    }

                    <div className='pictureFormIcon'>+</div>
                
                </div>
            )
        } else {
            rightItems = this.props.navLink;
        }

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
                    <div className="rightItems">
                        {rightItems}
                    </div>
                </div>
            </nav>
        )
        
    }
}

export default NavBar;