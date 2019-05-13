import React from 'react';
import NavBar from '../navbar/navbar';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PersonalProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editProfile: false,
        };

        this.toggleEditProfile = this.toggleEditProfile.bind(this);
    }

    toggleEditProfile() {
        debugger
        const { editProfile } = this.state;

        this.setState({
            editProfile: !editProfile
        });
    }

    componentDidMount() {
        this.props.fetchPictures();
    }

    render (){
        let pictures = this.props.pictures.map((picture, index) => {
            return (
                <img key={index} src={picture.img_url} className='personalProfile-pictures'/>
            );
        });

        let personalPicture;
        if (this.props.navBarPicture) {
            personalPicture = <img src={this.props.navBarPicture.img_url} className='personalProfile-personalPicture' />;
        } else {
            personalPicture = <img src={defaultProfilePic} className='personalProfile-personalPicture' />
        }

        let profileName;
        if (this.props.name) {
            profileName = this.props.name;
        } else {
            profileName = this.props.email;
        }

        let editProfileModal;
        if (this.state.editProfile) {
            editProfileModal = (
                <>
                    <div className='editProfileModal' onClick={this.toggleEditProfile}>
                        <div className='editProfileModal-form'>
                            <div className='editProfileModal-form-top'>
                
                            </div>


                            <div className='editProfileModal-form-middle'>

                            </div>

                            <div className='editProfileModal-form-bottom'>

                            </div>
                        </div>
                    </div>
                </>
                )
        } 
        
        let followerCount = <div className='personalProfile-detail-count'>{this.props.followers.length}</div>
        let followeeCount = <div className='personalProfile-detail-count'>{this.props.followees.length}</div>
        let pictureCount = this.props.pictures.length;

        return (
            <div>
                <NavBar currentUser={this.props.currentUser}
                    navLink={<div className='dropdownMenuItem-9' onClick={this.props.logOut}>Log out</div>}
                    navBarPicture={this.props.navBarPicture}
                />

                {editProfileModal}

                <div className='personalProfile-top'>
                    <div className='personalProfile-top-top'>
                        {personalPicture}
                        <div className='personalProfile-edit' onClick={this.toggleEditProfile}>
                            Edit your profile
                        </div>
                    </div>

                    <div className='personalProfile-top-bottom'>
                        <div className='personalProfile-name'>
                            {profileName}
                        </div>

                        <div className='personalProfile-details'>
                            <div className='personalProfile-details-item'>{followerCount} Followers</div>
                            <div className='personalProfile-details-item'>{followeeCount} Following</div>
                        </div>
                    </div>
                </div>

                <div className='personalProfile-middle'>
                    <div className='personalProfile-middle-tab-pictures'>
                        <div className='personalProfile-middle-tab-title'>PHOTOS</div>
                         {pictureCount}
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
