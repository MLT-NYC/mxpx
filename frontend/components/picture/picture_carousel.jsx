import React from 'react';
import LikeIndexContainer from '../like/like_index_container';

class PictureCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: props.currentIndex,
            showLikesIndex: false,
            likerIds: props.carouselPictures[props.currentIndex].likerIds
        };

        this.toggleLeft = this.toggleLeft.bind(this);
        this.toggleRight = this.toggleRight.bind(this);
        this.likePicture = this.likePicture.bind(this);
        this.unlikePicture = this.unlikePicture.bind(this);
        this.toggleLikesIndex = this.toggleLikesIndex.bind(this);
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

    toggleLikesIndex() {
        let { showLikesIndex } = this.state;

        this.setState({
            showLikesIndex: !showLikesIndex
        });
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

        let likesIndexButton;
        let likeCount = currentPicture.likerIds.length;
        if (likeCount > 0) {
            likesIndexButton = <div className='likesIndexButtonActive' onClick={this.toggleLikesIndex}>{likeCount}</div>
        } else {
            likesIndexButton = <div className='likesIndexButtonInactive'>{likeCount}</div> 
        }
        
        let likesIndex;
        if (this.state.showLikesIndex) {
            likesIndex = (
                <LikeIndexContainer
                    likerIds={currentPicture.likerIds}
                    toggleLikesIndex={this.toggleLikesIndex}
                />
            )
        }

        return (
            <>
                <div className='pictureCarousel-top'>
                    {likesIndex}

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
                            {likesIndexButton}
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