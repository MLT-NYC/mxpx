import React from 'react';
import NavBar from '../navbar/navbar';

class PictureForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            imgFile: null,
            imgUrl: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const picture = new FormData();
        picture.append('picture[title]', this.state.title);
        picture.append('picture[description]', this.state.description);

        if (this.state.imgFile) {
            picture.append('picture[image]', this.state.imgFile);
        }

        this.props.createPicture(picture);
        this.setState({
            title: '',
            description: '',
            imgFile: null,
            imgUrl: null
        });
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }

    handleFile(e) {
        e.preventDefault();

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            this.setState({imgFile: file, imgUrl: fileReader.result});
        };

        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    render() {
        let pictureTitleClass;
        let pictureInputClass;
        if (this.props.errors.length === 0) {
            pictureTitleClass = 'newPictureTitle';
            pictureInputClass = 'newPictureInput';
        } else {
            pictureTitleClass = 'newPictureTitle-error';
            pictureInputClass = 'newPictureInput-error';
        }

        let preview;
        if (this.state.imgUrl){
            preview = <img src={this.state.imgUrl} />
        } else{
            preview = null;
        }
 
        return (
            <>
                <NavBar currentUser={this.props.currentUser}
                    navLink={<div onClick={this.props.logOut}>Log out</div>}
                />  
                <div className='newPictureFormPage'>

                </div>

                <div className='newPictureFormContainer'>
                    <h3>Preview</h3>
                    {preview}

                    <form className='newPictureForm' onSubmit={this.handleSubmit}>
                        <h3 className='newPictureFormHeading'>
                        </h3>

                        <h5 className={pictureTitleClass}>Title</h5>
                        <input className={pictureInputClass} type="text" value={this.state.title} onChange={this.update('title')}/>

                        <h5 className={pictureTitleClass}>Description</h5>
                        <textarea className={pictureInputClass} type='text' value={this.state.description} onChange={this.update('description')}></textarea>

                        <input className={pictureInputClass} onChange={this.handleFile} type="file"/>

                        <input className='newPictureSubmit' type="submit" value='Submit'/>
                    </form>
                </div>
            </>
        )
    }
}

export default PictureForm;