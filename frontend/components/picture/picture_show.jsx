import React from 'react';
import { Link } from 'react-router-dom';

import PictureShowItem from './picture_show_item';

import PictureEditContainer from './picture_edit_container';

class PictureShow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editForm: false
        };

        this.toggleEditForm = this.toggleEditForm.bind(this);
    }

    toggleEditForm() {
        const { editForm } = this.state;

        this.setState({
            editForm: !editForm
        });
    }

    componentDidMount(){
        this.props.fetchPictures();
    }

    render(){

        let editModal;
        if (this.state.editForm){
            editModal = (
                <>
                    <PictureEditContainer />
                </>
            )
        }
    
        let pictures = this.props.pictures.map(picture => {
            return <PictureShowItem key={picture.id} picture={picture} toggleEditForm={this.toggleEditForm}/> 
        });
       
        let pictureCount = this.props.pictures.length;

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
                    {editModal}
                    {/* <PictureEditContainer /> */}
                </div>

            </div>
        );

    }
}

export default PictureShow;




