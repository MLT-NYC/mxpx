import React from 'react';

const PictureShowItem = props => {
    return (
            <img className='pictureShowItem' src={props.picture.img_url} />

    )

};

export default PictureShowItem;