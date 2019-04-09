import React from 'react';
import { Link } from 'react-router-dom';

import PictureShowItem from './picture_show_item';

import PictureEditContainer from './picture_edit_container';

class PictureShow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editForm: false,
            activeIndex: null
        };

        this.toggleEditForm = this.toggleEditForm.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggleEditForm() {
        const { editForm } = this.state;
        // debugger
        this.setState({
            editForm: !editForm
        });
    }

    handleClick(index) {
        this.setState({
            activeIndex: index
        });

        this.toggleEditForm();
    }

    componentDidMount(){
        this.props.fetchPictures();
    }

    render(){

        let pictureCount = this.props.pictures.length;

        let pictures = this.props.pictures.map((picture, index) => {
            const className = this.state.activeIndex === index && this.state.editForm ? 'pictureShowItem-active' : 'pictureShowItem';  
            return (
                    <Link to={`/pictures/new/${picture.id}/edit`} 
                        key={index} 
                        onClick={this.handleClick.bind(this, index)}>
                            <img className={className}src={picture.img_url}/>
                    </Link>
            )
        });

        let editModal;
        if (this.state.editForm){
            editModal = (
                <>
                    <PictureEditContainer />
                </>
            )
        } else {
            editModal = (
                <>
                    <form className='pictureEditForm-mock'>
                        <div className='pictureEditFormTitle-mock'>Edit
                        </div>

                        <div className='pictureEditSubmitFields-mock'>
                            <div className='pictureEditInputHeadings-mock'>Title</div>
                            <input className='pictureEditTitleInput-mock' type="text" readOnly value='Untitled Photo'/>

                            <div className='pictureEditInputHeadings-mock'>Description</div>
                            <textarea className='pictureEditDescriptionInput-mock' type='text' readOnly value='Tell us more about your beautiful photo'></textarea>
                        </div>

                        <div className='pictureEditSubmitContainer-mock'>
                            <input type="pictureEditSubmit-mock" type='submit' readOnly value='Save' />
                        </div>
                    </form>

                    <div className='pictureEditDeleteButton-mock'>Delete this Picture</div>
                </>
            )
        }

        return (
            <div className='pictureShowPage'>

                <div className='pictureShowPage-left'>
                    <div className='pictureShowPage-left-top'>
                        <Link to='/pictures/new' onClick={this.props.toggleShowForm} className='pictureCreateIcon-show'>Upload to Profile</Link>
                    </div>

                    <div className='pictureShowPage-left-bottom'>
                        <h3 className='pictureShowPage-left-bottom-title'>PHOTOS</h3>
                    </div>
                </div>

                <div className='pictureShowPage-mid'>
                    <div className='pictureShowPage-mid-top'>
                        <div className='pictureShowPage-mid-top-title'>Public</div> 
                        <span className='pictureShowPage-mid-top-count'>{`${pictureCount} Photos`}</span>
                    </div>

                  
                    <ul className='pictureShowPage-mid-bottom'>
                        {pictures}
                    </ul>
            
                </div>

                <div className='pictureShowPage-right'>
                    <div className='pictureShowPage-right-top'>

                    </div>

                    {editModal}

                </div>

            </div>
        );

    }
}

export default PictureShow;




