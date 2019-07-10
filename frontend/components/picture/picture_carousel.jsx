import React from 'react';
import LikeIndexContainer from '../like/like_index_container';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PictureCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: props.currentIndex,
            likerIds: props.carouselPictures[props.currentIndex].likerIds
        };

        this.toggleLeft = this.toggleLeft.bind(this);
        this.toggleRight = this.toggleRight.bind(this);
        this.likePicture = this.likePicture.bind(this);
        this.unlikePicture = this.unlikePicture.bind(this);
    }

    toggleLeft() {
        let leftIndex = this.state.currentIndex;
        leftIndex -= 1;

        let likerIds = this.props.carouselPictures[leftIndex].likerIds;
        this.setState({
            currentIndex: leftIndex,
            likerIds
        });
    }

    toggleRight() {
        let rightIndex = this.state.currentIndex;
        rightIndex += 1;

        let likerIds = this.props.carouselPictures[rightIndex].likerIds;
        this.setState({
            currentIndex: rightIndex,
            likerIds
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

        let currentPhotographerProfilePicImgUrl;
        if (currentPhotographerProfilePic) {
            currentPhotographerProfilePicImgUrl = currentPhotographerProfilePic.img_url;
        } else {
            currentPhotographerProfilePicImgUrl = defaultProfilePic
        }
       
        let leftNav;
        if (this.state.currentIndex > 0) {
            leftNav = (
                <div className='pictureCarousel-navLeft-active' onClick={() => this.toggleLeft()}>
                    <div className='pictureCarousel-close' onClick={() => this.props.closePictureCarousel()}>
                        <i className="fas fa-times"></i>
                    </div>

                    <span className='left-logo' onClick={() => this.toggleLeft()}><i className="fas fa-angle-left"></i></span>
                </div>
                );
        } else {
            leftNav = (
                <div className='pictureCarousel-navLeft-inactive'>
                    <div className='pictureCarousel-close' onClick={() => this.props.closePictureCarousel()}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            );
        }

        let rightNav;
        if (this.state.currentIndex < this.props.carouselPictures.length - 1) {
            rightNav = (
                <div className='pictureCarousel-navRight-active' onClick={() => this.toggleRight()}>
                    <span className='right-logo' onClick={() => this.toggleRight()}><i className="fas fa-angle-right"></i></span>
                </div>
                );
        } else {
            rightNav = (
                <div className='pictureCarousel-navRight-inactive'>
                </div>
            );
        }

        let likeIndexButton;
        let likeCount = currentPicture.likerIds.length;
        if (likeCount > 0) {
            likeIndexButton = <div className='likeIndexButtonActive' onClick={this.toggleLikeIndex}>{likeCount}</div>
        } else {
            likeIndexButton = <div className='likeIndexButtonInactive'>{likeCount}</div> 
        }

        return (
            <div className='pictureCarousel'>
                <div className='pictureCarousel-top'>
                    {leftNav}   

                    <div className='pictureCarousel-display'>
                        <img className='pictureCarousel-display-picture' src={currentPicture.img_url} />
                    </div>

                    {rightNav}
                </div>

                <div className='pictureCarousel-bottom'>
                    <div className='pictureDetails'>
                        <div className='pictureDetails-likes'>
                            {likeButton}
                            {likeIndexButton}
                        </div>

                        <div className='pictureDetails-authorship'>
                            <div className='pictureDetails-authorship-left'>
                                <div className='pictureDetails-authorship-title'>{currentPicture.title}</div>
                                <div className='pictureDetails-authorship-photographer'>by {photographerName}</div>
                            </div>

                            <div className='pictureDetails-authorship-right'>
                                <img className='pictureCarousel-photographerProfilePic' src={currentPhotographerProfilePicImgUrl}/>
                            </div>
                        </div>

                        <div className='pictureDetails-description'>
                            {currentPicture.description}
                        </div>
                    </div>

                    <div className='test'>

                    </div>
                    {/* comments go here */}
                </div>
            </div>
        )
    }
}

export default PictureCarousel;