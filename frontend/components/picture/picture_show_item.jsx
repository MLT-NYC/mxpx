import React from 'react';
import { Link } from 'react-router-dom';

const PictureShowItem = props => {
    // debugger
    
    return (
        <div className={props.pictureClass} onClick={props.toggleEditForm}>
            <Link to={`/pictures/new/${props.picture.id}/edit`}><img 
            className='pictureShowItem'
            src={props.picture.img_url}/></Link> 
        </div>
    )

};

export default PictureShowItem;