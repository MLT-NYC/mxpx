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
                navLink={<div onClick={this.props.logOut}>Log out</div>}
                />    
            </div>
        )
    }
}

export default Profile;