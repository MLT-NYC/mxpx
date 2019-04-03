import React from 'react';
import NavBar from '../navbar/navbar';

class PictureForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const picture = Object.assign({}, this.state);
        this.props.createPicture(picture);
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }

    render() {

        let pictureTitleClass;
        let pictureInputClass;
        if (this.props.errors.length === 0) {
            sessionTitleClass = 'newPictureTitle';
            sessionInputClass = 'newPictureInput';
        } else {
            sessionTitleClass = 'newPictureTitle-error';
            sessionInputClass = 'newPictureInput-error';
        }


        return (
            <>
                <NavBar currentUser={this.props.currentUser}
                    navLink={<div onClick={this.props.logOut}>Log out</div>}
                />  
                <div className='newPictureFormPage'>

                </div>

                <div className='newPictureFormContainer'>
                    <form className='newPictureForm' onSubmit={this.handleSubmit}>
                        <h3 className='newPictureFormHeading'>
                        </h3>

                        <h5 className={pictureTitleClass}>Title</h5>
                        <input className={pictureInputClass} type="text" value={this.state.title} onChange={this.update('title')}/>

                        <h5 className={pictureTitleClass}>Description</h5>
                        <textarea className={pictureInputClass} type='text' value={this.state.description} onChange={this.update('description')}></textarea>

                        <input className={pictureInputClass} className='newPictureInput' type="file"/>

                        <input className='newPictureSubmit' type="submit" value='Submit'/>
                    </form>
                </div>
            </>
        )
    }
}

export default PictureForm;