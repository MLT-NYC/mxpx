import React from 'react';
import NavBar from '../navbar/navbar';
// import { Link } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchPictures();
        // debugger
    }

    render(){

        let pictures = this.props.pictures.map((picture, index) => {
            return (
                <img key={index} src={picture.img_url}/>
            );
        });

        return (
            <div>
                <NavBar currentUser={this.props.currentUser} 
                    navLink={<div className='dropdownMenuItem-9' onClick={this.props.logOut}>Log out</div>}
                />    

                <ul>
                    {pictures}
                </ul>
            </div>
        )
    }
}

export default Profile;