import React from 'react';

class PictureEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            id: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchPicture(this.props.pictureId).then((success) => {
            this.setState({
                title: success.picture.title,
                description: success.picture.description,
                id: success.picture.id
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (parseInt(prevProps.location.pathname.split('/')[3], 10) !== parseInt(this.props.location.pathname.split('/')[3], 10) ) {
            this.props.fetchPicture(parseInt(this.props.location.pathname.split('/')[3], 10))
                .then((success) => this.setState({
                    title: success.picture.title,
                    description: success.picture.description,
                    id: success.picture.id
                }));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let picture = this.state;
        this.props.updatePicture(picture);
    }

    handleDelete(e) {
        e.preventDefault();

        this.setState({
            title: '',
            description: '',
            id: null
        });

        this.props.deletePicture(this.props.pictureId);
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }
    render() {

        return (
            <>
                <div className='pictureShowPage-right-top'>Editing 1 Photo</div>

                <form className='pictureEditForm' onSubmit={this.handleSubmit}>
                    <div className='pictureEditSubmitFields'>
                        <div className='pictureEditInputHeadings'>Title</div>
                        <input className='pictureEditTitleInput' type="text" value={this.state.title} onChange={this.update('title')} />

                        <div className='pictureEditInputHeadings'>Description</div>
                        <textarea className='pictureEditDescriptionInput' type='text' value={this.state.description} onChange={this.update('description')}></textarea>
                    </div>

                    <input className='pictureEditSubmitButton' type="pictureEditSubmit" type='submit' value='Save'/>
                    <div className='pictureEditDeleteButton' onClick={this.handleDelete}>Delete this Picture</div>
                </form>

            </>
        );
    }
}

export default PictureEdit;