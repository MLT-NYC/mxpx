import React from 'react';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PersonalEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.currentUserId,
            first_name: props.firstName,
            last_name: props.lastName,
            city: props.city,
            country: props.country,
            about: props.about,
            profile_picture_id: props.profile_picture_id, 
            cover_picture_id: props.cover_picture_id,
            submitButtonActive: false,
            coverModal: false,
            imgFile: null,
            imgUrl: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.toggleCoverModal = this.toggleCoverModal.bind(this);
    }

    handleFile(e) {
        e.preventDefault();

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            this.setState({ imgFile: file, imgUrl: fileReader.result });
        };

        if (file) {
            fileReader.readAsDataURL(file);
        }

    }

    handleSubmit(e) {
        e.preventDefault();

        let { id, first_name, last_name, city, country, about, profile_picture_id, cover_picture_id } = this.state;

        let user = { id, first_name, last_name, city, country, about, profile_picture_id, cover_picture_id };

        if (user.first_name === this.props.firstName || user.first_name.length === 0) {delete user.first_name;} 
        if (user.last_name === this.props.lastName || user.last_name.length === 0) { delete user.last_name;} 
        if (user.city === this.props.city || user.city.length === 0) {delete user.city;} 
        if (user.country === this.props.country || user.country.length === 0) {delete user.country;} 
        if (user.about === this.props.about || user.about.length === 0) {delete user.about;}

        const picture = new FormData();
        picture.append('picture[title]', 'profilePicPlaceHolder');
        picture.append('picture[description]', 'profilePicPlaceHolder');
        picture.append('picture[profile]', true);

        if (this.state.imgFile) {
            picture.append('picture[image]', this.state.imgFile);
            picture.append('picture[image]', this.state.imgFile);
        }

        this.props.createPicture(picture).then(() => {
            this.setState({
                imgFile: null,
                imgUrl: null
            });
        });

        this.props.updateUser(user);
        this.props.toggleEditProfile();
    }

    toggleCoverModal() {
        const { coverModal } = this.state;

        this.setState({
            coverModal: !coverModal
        });
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value,
            submitButtonActive: true
        });
    }

    render() {
        let personalPicture;
        if (this.props.navBarPicture) {
            personalPicture = (
                <img src={this.props.navBarPicture.img_url} className='personalEdit-personalPicture' />
            );
        } else {
            personalPicture = (
                <img src={defaultProfilePic} className='personalEdit-personalPicture' />
            );
        }

        if (this.state.imgUrl) {
            personalPicture = (
                <img src={this.state.imgUrl} className='personalEdit-personalPicture' />
            );
        }

        let personalCoverEdit;
        if (this.state.toggleCoverModal) {
            personalCoverEdit = <PersonalCoverEditContainer toggleCoverModal={this.toggleCoverModal}/>
        }

        return (
            <div className='editProfileModal-form'>
                <div className='editProfileModal-form-top'>
                    <input type="file"/>
                </div>

                {personalCoverEdit}

                <div className='editProfileModal-form-middle'>
                    <label className='editProfileModal-personalPicture-wrapper'>
                        {personalPicture}
                        <input className='newPictureInput' onChange={this.handleFile} type="file" />
                    </label>
                    

                    <form className='editProfileModal-form-middle-inputs' onSubmit={this.handleSubmit}>
                        <div className='editProfileModal-form-middle-inputs-item'>
                            <label className='editProfileModal-form-middle-inputs-item-heading'>First name</label>
                            <input className='editProfileModal-form-middle-inputs-item-input' type='text' 
                                value={this.state.first_name} 
                                onChange={this.update('first_name')}/>
                        </div>

                        <div className='editProfileModal-form-middle-inputs-item'>
                            <label className='editProfileModal-form-middle-inputs-item-heading'>Last name</label>
                            <input className='editProfileModal-form-middle-inputs-item-input' type='text'
                                value={this.state.last_name}
                                onChange={this.update('last_name')} />
                        </div>

                        <div className='editProfileModal-form-middle-inputs-item'>
                            <label className='editProfileModal-form-middle-inputs-item-heading'>Location</label>
                            <input className='editProfileModal-form-middle-inputs-item-input' type='text'
                                value={this.state.city}
                                onChange={this.update('city')} />

                            <input className='editProfileModal-form-middle-inputs-item-input' type='text'
                                value={this.state.country}
                                onChange={this.update('country')} />
                        </div>

                        <div className='editProfileModal-form-middle-inputs-item'>
                            <label className='editProfileModal-form-middle-inputs-item-heading'>About</label>
                            <textarea className='editProfileModal-form-middle-inputs-item-input' type='text'
                                value={this.state.about}
                                onChange={this.update('about')}></textarea>
                        </div>

                        <div className='editProfileModal-form-bottom'>
                            <button className='editProfileModal-form-bottom-cancel' onClick={this.props.toggleEditProfile}>Cancel</button>
                            <input className='editProfileModal-form-bottom-submit' type="submit" value='Save' />
                        </div>
                    </form>

                </div>

                
            </div>
        )
    }
}

export default PersonalEdit;