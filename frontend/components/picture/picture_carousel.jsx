import React from 'react';

class PictureCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: props.currentIndex
        };

        this.toggleLeft = this.toggleLeft.bind(this);
        this.toggleRight = this.toggleRight.bind(this);
        this.likePicture = this.likePicture.bind(this);
        this.unlikePicture = this.unlikePicture.bind(this);
    }

    toggleLeft() {
        let leftIndex = this.state.currentIndex;
        leftIndex -= 1;

        this.setState({
            currentIndex: leftIndex
        });
    }

    toggleRight() {
        let rightIndex = this.state.currentIndex;
        rightIndex += 1;

        this.setState({
            currentIndex: rightIndex
        });
    }

    likePicture(pictureId) {
        let like = {
            pictureId: pictureId,
            likerId: this.props.currentUser.id
        };

        this.props.likePicture(like);
    }

    unlikePicture(pictureId) {
        let like = {
            pictureId: pictureId,
            likerId: this.props.currentUser.id
        };

        this.props.unlikePicture(like);
    }

    render(){
        let currentPicture = this.props.carouselPictures[this.state.currentIndex];
        let currentPhotographer = this.props.allUsers[currentPicture.photographer_id];
        let currentPhotographerProfilePic = this.props.allPictures[currentPhotographer.profile_picture_id];

        let likeButton;
        if (this.props.currentUser.pictureIds.includes(currentPicture.id)) {
            likeButton = (<i className="far fa-heart" />)
        } else {
            if (currentPicture.likerIds.includes(this.props.currentUser.id)) {
                likeButton = (<i className="fas fa-heart" onClick={() => this.unlikePicture(currentPicture.id)}></i>)
            } else {
                likeButton = (<i className="far fa-heart" onClick={() => this.likePicture(currentPicture.id)}></i>)
            }
        }

        let photographerName;
        if (currentPhotographer.first_name) {
            photographerName = currentPhotographer.first_name + ' ' + currentPhotographer.last_name;
        } else {
            photographerName = currentPhotographer.email;
        }
       
        let leftNav;
        if (this.state.currentIndex > 0) {
            leftNav = (<div className='pictureCarousel-navLeft' onClick={() => this.toggleLeft()}>Left</div>);
        }

        let rightNav;
        if (this.state.currentIndex < this.props.carouselPictures.length - 1) {
            rightNav = (<div className='pictureCarousel-navRight' onClick={this.toggleRight}>Right</div>);
        }

        return (
            <>
                <div className='pictureCarousel-top'>

                    <div className='pictureCarousel-top-left'>
                        <div className='pictureCarousel-close' onClick={() => this.props.closePictureCarousel()}>CLOSE ICON</div>
                       {leftNav}
                    </div>

                    <div className='pictureCarousel-display'>
                        <img src={currentPicture.img_url}/>
                    </div>

                    {rightNav}
                </div>

                <div className='pictureCarousel-bottom'>
                    <div className='pictureDetails'>
                        <div className='pictureDetails-likes'>
                            {likeButton}
                            {/* Likers Component Goes Here */}
                        </div>

                        <div className='pictureDetails-authorship'>
                            <div className='pictureDetails-authorship-left'>
                                <div className='pictureDetails-authorship-title'>{currentPicture.title}</div>
                                <div className='pictureDetails-authorship-photographer'>by {photographerName}</div>
                            </div>

                            <div className='pictureDetails-authorship-right'>
                                <img src={currentPhotographerProfilePic.img_url}/>
                            </div>
                        </div>

                        <div className='pictureDetails-description'>
                            {currentPicture.description}
                        </div>
                    </div>

                    {/* Comment Component Goes Here */}
                </div>
            </>
        )
    }
}

export default PictureCarousel;