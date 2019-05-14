import React from 'react';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PersonalEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.currentUser.id,
            first_name: props.firstName,
            last_name: props.lastName,
            city: props.city,
            country: props.country,
            about: props.about,
            submitButtonActive: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = this.state;
        this.props.updateUser(user);
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
                            <input className='editProfileModal-form-bottom-submit' type="submit" value='Save' />
                        </div>
                    </form>

                </div>

                
            </div>
        )
    }
}

export default PersonalEdit;