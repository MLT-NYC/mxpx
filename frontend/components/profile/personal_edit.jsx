import React from 'react';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PersonalEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let personalPicture;
        if (this.props.navBarPicture) {
            personalPicture = <img src={this.props.navBarPicture.img_url} className='personalEdit-personalPicture' />;
        } else {
            personalPicture = <img src={defaultProfilePic} className='personalEdit-personalPicture' />
        }

        return (
            <div className='editProfileModal-form'>
                <div className='editProfileModal-form-top'>

                </div>


                <div className='editProfileModal-form-middle'>
                    {personalPicture}

                    <form className='editProfileModal-form-middle-inputs'>

                    </form>
                </div>

                <div className='editProfileModal-form-bottom'>

                </div>
            </div>
        )
    }
}

export default PersonalEdit;