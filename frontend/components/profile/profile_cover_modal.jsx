import React from 'react';
import { Link } from 'react-router-dom';

class ProfileCoverModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            id: null,
        };
    }

    render() {
        let pictures = this.props.pictures.map((picture, index) => {
            return (
                <Link
                    key={index}
                    // onClick={this.handleClick.bind(this, index)} 
                >
                    <img className='newPicturePreview' src={picture.img_url} />
                </Link>
            )
        })

        return (
                <div className='profileCoverModal-container'>
                    <div className='profileCoverModal-top'>

                    </div>

                    <div className='profileCoverModal-mid'>
                        {pictures}
                    </div>

                    <div className='profileCoverModal-bottom'>

                    </div>
                </div>
            
        )
    }
}

export default ProfileCoverModal;