import React from 'react';
import ErrorMessage from '../notification/error_message';

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

    componentDidMount() {
        this.props.clearPictureErrors();
    }

    handleSubmit(e) {
        e.preventDefault();

        const picture = new FormData();
        picture.append('picture[title]', this.state.title);
        picture.append('picture[description]', this.state.description);

        if (this.state.imgFile) {
            picture.append('picture[image]', this.state.imgFile);
        }

        this.props.createPicture(picture).then(() => {
            this.setState({
                title: '',
                description: '',
                imgFile: null,
                imgUrl: null
            });
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
        debugger
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
        let pictureTitleInputClass;
        let pictureDescriptionInputClass;
        if (this.props.errors.length === 0) {
            pictureTitleClass = 'newPictureTitle';
            pictureInputClass = 'newPictureInput';
            pictureTitleInputClass = 'newTitlePictureInput';
            pictureDescriptionInputClass = 'newDescriptionPictureInput';
        } else {
            pictureTitleClass = 'newPictureTitle-error';
            pictureInputClass = 'newPictureInput-error';
            pictureTitleInputClass = 'newTitlePictureInput-error';
            pictureDescriptionInputClass = 'newDescriptionPictureInput-error';
        }

        let preview;
        if (this.state.imgUrl){
            preview = <img className='newPicturePreview' src={this.state.imgUrl} />
        } else{
            preview = null;
        }
 
        return (
            <>
                
                <div className='newPictureFormPage'>

                    <div className='pictureErrorContainer'>
                        <ErrorMessage className='picture-error' errors={this.props.errors} />
                    </div>

                    <div className='newPictureFormContainer'>
                        
                        <div className='newPictureFormContainer-left'>
                            {preview}
                            <label className='selectPictureButton'>
                                <div className='selectPictureButton-plus'><i className="fas fa-plus"></i></div>
                                <div>Add more pictures</div>
                                <input className={pictureInputClass} onChange={this.handleFile} type="file" />
                            </label>
                        </div>
                        
                        <div className='newPictureFormContainer-right'>
                            <form className='newPictureForm' onSubmit={this.handleSubmit}>

                                <div className='newPictureFormContainer-right-top'>
                                    <input className='newPictureSubmit' type="submit" value='Submit'/>
                                </div>

                                <div className='newPictureFormContainer-right-bottom'>
                                    <div className='newPictureFormHeading'>Edit
                                    </div>

                                    <div className={pictureTitleClass}>Title</div>
                                    <input className={pictureTitleInputClass} type="text" value={this.state.title} onChange={this.update('title')}/>

                                    <div className={pictureTitleClass}>Description</div>
                                    <textarea className={pictureDescriptionInputClass} type='text' value={this.state.description} onChange={this.update('description')}></textarea>
                                </div>

                
                            </form>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default PictureForm;