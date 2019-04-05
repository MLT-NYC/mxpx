import React from 'react';
import { Link } from 'react-router-dom';

import PictureShowItem from './picture_show_item';

class PictureShow extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.fetchPictures();
    }

    render(){
        let pictures = this.props.pictures.map(picture => {
            return <PictureShowItem key={picture.id} picture={picture}/> 
        });

        return (
            <div className='pictureShowPage'>

                <div className='pictureShowPage-left'>
                    <div className='pictureShowPage-left-top'>
                        <Link to='/pictures/new' onClick={this.props.toggleShowForm} className='pictureCreateIcon-show'>Upload to Profile</Link>
                    </div>

                    <div className='pictureShowPage-left-bottom'>

                    </div>
                </div>

                <div className='pictureShowPage-mid'>
                    <div className='pictureShowPage-mid-top'>

                    </div>

                    <div className='pictureShowPage-mid-bottom'>
                        <ul>
                            {pictures}
                        </ul>
                    </div>
                </div>

                <div className='pictureShowPage-right'>

                </div>

            </div>
        );

    }
}

export default PictureShow;




