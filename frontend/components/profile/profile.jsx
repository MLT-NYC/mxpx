import React from 'react';
import NavBar from '../navbar/navbar';

class Profile extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <NavBar currentUser={this.props.currentUser} 
                    navLink={<div className='dropdownMenuItem-9' onClick={this.props.logOut}>Log out</div>}
                />    

                <h1>Test</h1>
            </div>
        )
    }
}

export default Profile;