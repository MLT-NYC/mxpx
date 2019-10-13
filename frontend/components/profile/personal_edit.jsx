import React from 'react';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';
import ErrorMessage from '../notification/error_message';
import ProfileCoverModalContainer from './profile_cover_modal_container';

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
            ownPicturesModal: false,
            imgFile: null,
            imgUrl: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleCover = this.handleCover.bind(this);
        this.toggleCoverModal = this.toggleCoverModal.bind(this);
        this.toggleOwnPicturesModal = this.toggleOwnPicturesModal.bind(this);
    }

    handleFile(e) {
        e.preventDefault();

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            this.setState({
                imgFile: file,
                imgUrl: fileReader.result,
                submitButtonActive: true
            });
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
        picture.append('picture[showcase]', false);
        picture.append('picture[profile]', true);

        if (this.state.imgFile) {
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

    handleCover(e) {
        e.preventDefault();

        const file = e.target.files[0];
        const fileReader = new FileReader();
        const picture = new FormData();
        picture.append('picture[title]', 'coverPicPlaceHolder');
        picture.append('picture[description]', 'coverPicPlaceHolder');
        picture.append('picture[showcase]', false);
        picture.append('picture[cover]', true);

        if (file) {
            fileReader.readAsDataURL(file);
            picture.append('picture[image]', file);
        }

        this.props.createPicture(picture);
        this.toggleCoverModal();
    }

    toggleCoverModal() {
        const { coverModal } = this.state;

        this.setState({
            coverModal: !coverModal
        });
    }

    toggleOwnPicturesModal() {
        const { ownPicturesModal } = this.state;

        this.setState({
            ownPicturesModal: !ownPicturesModal,
            coverModal: false
        });
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value,
            submitButtonActive: true
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.cover_picture_id != prevProps.cover_picture_id) {
            this.props.fetchPictures();
        }
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

        let coverModal;
        if (this.state.coverModal) {
            coverModal = (
                <>
                    <div className='personalCoverEditModal-arrow-outer'>
                    </div>

                    <div className='personalCoverEditModal'>
                        <label className='personalCoverEditModal-top'>
                            <div className='personalCoverEditModal-arrow-inner'>
                            </div>
                            Upload from Computer
                            <input className='newPictureInput' onChange={this.handleCover} type="file" />
                        </label>

                        <div className='personalCoverEditModal-bottom' onClick={this.toggleOwnPicturesModal}>
                            Choose from your Library
                        </div>
                    </div>
                </>
            )
        }

        let ownPicturesModal;
        if (this.state.ownPicturesModal) {
            ownPicturesModal = (
                <>
                    <div className='profileCoverModal' onClick={this.toggleOwnPicturesModal}>
                    </div>
                    <ProfileCoverModalContainer toggleOwnPicturesModal={this.toggleOwnPicturesModal}/>
                </>
            )
        }

        let coverPicture;
        if (this.props.coverPicture) {
            coverPicture = (
                <img className='editProfileModal-form-top-cover' src={this.props.coverPicture.img_url} />
            )
        }

        let submitButton;
        if (this.state.submitButtonActive) {
            submitButton = <input className='editProfileModal-form-bottom-submit' type="submit" value='Save' />
        } else {
            submitButton = <input className='editProfileModal-form-bottom-submit' type="button" value='Save' onClick={this.props.toggleEditProfile} />
        }

        return (
            <div className='editProfileModal-form'>
                <div className='pictureErrorContainer'>
                    <ErrorMessage className='picture-error' errors={this.props.errors} />
                </div>

                <div className='editProfileModal-form-top' onClick={this.toggleCoverModal}>
                    {coverPicture}
                </div>


                <div className='editProfileModal-form-middle'>
                    <label className='editProfileModal-personalPicture-wrapper'>
                        {personalPicture}
                        <input className='newPictureInput' onChange={this.handleFile} type="file" />
                    </label>

                        {coverModal}
                        {ownPicturesModal}

                    <form className='editProfileModal-form-middle-inputs' onSubmit={this.handleSubmit}>
                        <div className='editProfileModal-form-middle-inputs-names'>
                            <div className='editProfileModal-form-middle-inputs-name'>
                                <label className='editProfileModal-form-middle-inputs-heading'>First name</label>
                                <input className='editProfileModal-form-middle-inputs-name-input' type='text'
                                    value={this.state.first_name}
                                    onChange={this.update('first_name')}/>
                            </div>

                            <div className='editProfileModal-form-middle-inputs-lastname'>
                                <label className='editProfileModal-form-middle-inputs-heading'>Last name</label>
                                <input className='editProfileModal-form-middle-inputs-name-input' type='text'
                                    value={this.state.last_name}
                                    onChange={this.update('last_name')} />
                            </div>
                        </div>

                        <div className='editProfileModal-form-middle-inputs-location'>
                            <label className='editProfileModal-form-middle-inputs-heading'>Location</label>
                            <div className='editProfileModal-form-middle-inputs-location-inputs'>
                                <input className='editProfileModal-form-middle-inputs-city-input' type='text'
                                    value={this.state.city}
                                    onChange={this.update('city')} />

                                <input className='editProfileModal-form-middle-inputs-country-input' type='text'
                                    value={this.state.country}
                                    onChange={this.update('country')} />
                            </div>
                        </div>

                        <div className='editProfileModal-form-middle-inputs-about'>
                            <label className='editProfileModal-form-middle-inputs-heading'>About</label>
                            <textarea className='editProfileModal-form-middle-inputs-about-input' type='text'
                                value={this.state.about}
                                onChange={this.update('about')}></textarea>
                        </div>

                        <div className='editProfileModal-form-bottom'>
                            <button className='editProfileModal-form-bottom-cancel' onClick={this.props.toggleEditProfile}>Cancel</button>
                            {submitButton}
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default PersonalEdit;
