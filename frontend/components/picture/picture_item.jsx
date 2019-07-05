import React from 'react';
import LikeIndexContainer from '../like/like_index_container';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PictureItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLikeIndex: false
        };

        this.likePicture = this.likePicture.bind(this);
        this.unlikePicture = this.unlikePicture.bind(this);
        this.toggleLikeIndex = this.toggleLikeIndex.bind(this);
    }

    componentDidMount() {
        let photographerProfilePicId = this.props.photographerProfilePicId;
        
        if (photographerProfilePicId) {
            this.props.fetchPicture(photographerProfilePicId);
        }
    }

    likePicture() {
        let like = {
            pictureId: this.props.picture.id,
            likerId: this.props.currentUserId
        };

        this.props.likePicture(like);
    }

    unlikePicture() {
        let like = {
            pictureId: this.props.picture.id,
            likerId: this.props.currentUserId
        };

        this.props.unlikePicture(like);
    }

    toggleLikeIndex() {
        let { showLikeIndex } = this.state;

        this.setState({
            showLikeIndex: !showLikeIndex
        });
    }

    render() {
        let likeButton;
        if (this.props.currentUser.pictureIds.includes(this.props.picture.id)) {
            likeButton = (<i className="far fa-heart" />)
        } else {
            if (this.props.picture.likerIds.includes(this.props.currentUserId)) {
                likeButton = (<i className="fas fa-heart" onClick={() => this.unlikePicture()}></i>)
            } else {
                likeButton = (<i className="far fa-heart" onClick={() => this.likePicture()}></i>)
            }
        }

        let likeIndex;
        if (this.state.showLikeIndex) {
            likeIndex = (
                <LikeIndexContainer
                    likerIds={this.props.picture.likerIds}
                    toggleLikeIndex={this.toggleLikeIndex}
                />
            )
        }

        let likeIndexButton;
        let likeCount = this.props.picture.likerIds.length;
        if (likeCount > 0) {
            likeIndexButton = <div className='likeIndexButtonActive' onClick={this.toggleLikeIndex}>{likeCount}</div>
        } else {
            likeIndexButton = <div className='likeIndexButtonInactive'>{likeCount}</div>
        }

        let photographerProfilePicIdImgUrl;
        if (this.props.photographerProfilePicIdImgUrl) {
            photographerProfilePicIdImgUrl = this.props.photographerProfilePicIdImgUrl;
        } else {
            photographerProfilePicIdImgUrl = defaultProfilePic;
        }
        return (
            <>
                {likeIndex}
                <img src={this.props.imgUrl} className='profilePictures' onClick={() => this.props.openPictureCarousel(this.props.carouselIndex)}/>
                <div className='pictureItem-info'>
                    <div className='pictureItem-info-top'>
                        {likeButton}
                        {likeIndexButton}
                    </div>
                    <div className='pictureItem-info-bottom'>
                        <div className='pictureItem-info-bottom-left'>
                            <div className='pictureItem-info-bottom-left-pictureTitle'>
                                {this.props.picture.title}
                            </div>
                            <div>
                                by {this.props.photographerName}
                            </div>
                        </div>
                        <div className='pictureItem-info-bottom-right'>
                            <img src={photographerProfilePicIdImgUrl}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PictureItem;