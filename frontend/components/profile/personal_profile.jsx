import React from 'react';
import NavBar from '../navbar/navbar';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PersonalProfile extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchPictures();
    }

    render (){
        let pictures = this.props.pictures.map((picture, index) => {
            return (
                <img key={index} src={picture.img_url}/>
            );
        });

        let personalPicture;
        if (this.props.navBarPicture) {
            personalPicture = <img src={this.props.navBarPicture.img_url} className='navBarPicture' />;
        } else {
            personalPicture = <img src={defaultProfilePic} className='navBarPicture' />
        }

        let profileName;
        if (this.props.name) {
            profileName = this.props.name;
        } else {
            profileName = this.props.email;
        }

        let followerCount = this.props.followers.length;
        let followeeCount = this.props.followees.length;
        let pictureCount = this.props.pictures.length;

        return (
            <div>
                <NavBar currentUser={this.props.currentUser}
                    navLink={<div className='dropdownMenuItem-9' onClick={this.props.logOut}>Log out</div>}
                    navBarPicture={this.props.navBarPicture}
                />

                <div className='personalProfile-top'>
                    <div className='personalProfile-top-top'>
                        {personalPicture}
                        <div className='personalProfile-edit'>
                            Edit your profile
                        </div>
                    </div>

                    <div className='personalProfile-top-bottom'>
                        <div className='personalProfile-name'>
                            {profileName}
                        </div>

                        <div className='personalProfile-details'>
                            <div className='personalProfile-details-followers'>Followers {followerCount}</div>
                            <div className='personalProfile-details-followees'>Following {followeeCount}</div>
                        </div>
                    </div>
                </div>

                <div className='personalProfile-middle'>
                    <div className='personalProfile-middle-pictures'>
                        PHOTOS {pictureCount}
                    </div>
                </div>

                <div className='personalProfile-bottom'>
                    <ul>
                        {pictures}
                    </ul>
                </div>
            </div>
        )
    }
}

export default PersonalProfile;
