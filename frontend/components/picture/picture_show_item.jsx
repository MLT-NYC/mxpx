import React from 'react';
import { Link } from 'react-router-dom';

const PictureShowItem = props => {
    // debugger
    return (
        <>
            <Link to={`/pictures/new/${props.picture.id}/edit`}><img className='pictureShowItem' src={props.picture.img_url} onClick={props.toggleEditForm}/></Link> 
    
        </>

    )

};

export default PictureShowItem;