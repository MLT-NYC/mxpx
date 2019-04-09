import React from 'react';

class PictureEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        // debugger
        this.props.fetchPicture(this.props.pictureId).then((success) => {
            this.setState({
                title: success.picture.title,
                description: success.picture.description
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        picture = this.state;

        this.props.updatePicture(picture);
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }
    render() {

        return (
            <>
                <form className='pictureEditForm' onSubmit={this.handleSubmit}>
                    <div className='pictureEditFormTitle'>Edit
                    </div>

                    <div className='pictureEditSubmitFields'>
                        <div className='pictureEditInputHeadings'>Title</div>
                        <input className='pictureEditTitleInput' type="text" value={this.state.title} onChange={this.update('title')} />

                        <div className='pictureEditInputHeadings'>Description</div>
                        <textarea className='pictureEditDescriptionInput' type='text' value={this.state.description} onChange={this.update('description')}></textarea>
                    </div>

                    <div className='pictureEditSubmitContainer'>
                        <input type="pictureEditSubmit" type='submit' value='Save'/>
                    </div>
                </form>

                <div className='pictureEditDeleteButton' onClick={() => (this.props.deletePicture(this.props.pictureId))}>Delete this Picture</div>
            </>
        );
    }
}

export default PictureEdit;