import React from 'react';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class PictureItem extends React.Component {
    constructor(props) {
        super(props);

        this.likePicture = this.likePicture.bind(this);
        this.unlikePicture = this.unlikePicture.bind(this);
    }

    componentDidMount() {
        let photographerProfilePicId = this.props.photographerProfilePicId;
        let photographerProfilePicIdImgUrl = this.props.photographerProfilePicIdImgUrl;

        debugger
        if (photographerProfilePicId && photographerProfilePicIdImgUrl === undefined) {
            debugger
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

    render() {
        let likeButton;
        if (this.props.currentUser.pictureIds.includes(this.props.picture.id)) {
            likeButton = (<div className='pictureItem-unlikeable'><i className="far fa-heart" /></div>)
        } else {
            if (this.props.picture.likerIds.includes(this.props.currentUserId)) {
                likeButton = (<div className='pictureItem-liked'><i className="fas fa-heart" onClick={() => this.unlikePicture()}></i></div>)
            } else {

                likeButton = (<div className='pictureItem-notLiked'><i className="far fa-heart" onClick={() => this.likePicture()}></i></div>)
            }
        }


        let likeIndexButton;
        let likeCount = this.props.picture.likerIds.length;
        if (likeCount > 0) {
            likeIndexButton = <div className='likeIndexButtonActive' onClick={() => this.props.openLikeIndex(this.props.carouselIndex)}>{likeCount}</div>
        } else {
            likeIndexButton = <div className='likeIndexButtonInactive'>{likeCount}</div>
        }

        let photographerProfilePicIdImgUrl;
        if (this.props.photographerProfilePicIdImgUrl) {
            photographerProfilePicIdImgUrl = this.props.photographerProfilePicIdImgUrl;
        } else {
            photographerProfilePicIdImgUrl = defaultProfilePic;
        }

        let className;
        if (this.props.className) {
            className = this.props.className;
        } else {
            className = 'pictureItem-picture'
        }
        return (
            <div className='pictureItem'>
                <img src={this.props.imgUrl} className={className} onClick={() => this.props.openPictureCarousel(this.props.carouselIndex)}/>
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
                            <div className='pictureItem-info-bottom-left-photographer'>
                                by {this.props.photographerName}
                            </div>
                        </div>
                        <div className='pictureItem-info-bottom-right'>
                            <img src={photographerProfilePicIdImgUrl} className='pictureItem-photographerProfilePic'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PictureItem;
