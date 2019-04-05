import React from 'react';

const PictureShowItem = props => {
    return (
        <div>
            <img className='pictureShowItem' src={props.picture.img_url} />
        </div>

    )

};

export default PictureShowItem;