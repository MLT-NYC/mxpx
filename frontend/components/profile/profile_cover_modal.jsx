import React from 'react';

class ProfileCoverModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cover: true,
            activeIndex: null,
            id: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index, id) {
        this.setState({
            id: id,
            activeIndex: index
        });

    }

    handleSubmit(e) {
        e.preventDefault();

        let { id, cover } = this.state;
        let picture = { id, cover};


        this.props.updatePicture(picture);
        this.props.toggleOwnPicturesModal();
    }

    render() {
        let pictures = this.props.pictures.map((picture, index) => {
            const className = this.state.activeIndex === index ? 'pictureShowItem-active' : 'pictureShowItem'; 
            return (
                <li
                    key={index}
                    onClick={this.handleClick.bind(this, index, picture.id)} className='imageLink'>
                        <img className={className} src={picture.img_url} />
                </li>
            )
        })

        return (
                <div className='profileCoverModal-container'>
                    <div className='profileCoverModal-top'>
                        <label>ADD PHOTOS FROM YOUR LIBRARY</label>
                    </div>

                    <div className='profileCoverModal-mid'>
                        {pictures}
                    </div>

                    <div className='profileCoverModal-bottom'>
                        <button className='profileCoverModal-bottom-cancel' onClick={this.props.toggleOwnPicturesModal}>Cancel</button>
                        <button className='profileCoverModal-bottom-save' onClick={this.handleSubmit}>Save</button>
                    </div>
                </div>
            
        )
    }
}

export default ProfileCoverModal;