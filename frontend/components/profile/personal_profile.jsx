import React from 'react';
import NavBar from '../navbar/navbar'

class PersonalProfile extends React.Component {
    constructor(props){
        super(props);
    }

    render (){
        let pictures = this.props.pictures.map((picture, index) => {
            return (
                <img key={index} src={picture.img_url} className='profilePictures' />
            );
        });

        return (
            <div>
                <NavBar currentUser={this.props.currentUser}
                    navLink={<div className='dropdownMenuItem-9' onClick={this.props.logOut}>Log out</div>}
                    navBarPicture={this.props.navBarPicture}
                />

                <ul className='picturesProfileContainer'>
                    {pictures}
                </ul>
            </div>
        )
    }
}

export default PersonalProfile;
