import { connect } from 'react-redux';
import PictureItem from './picture_item';

import {
    likePicture,
    unlikePicture
} from '../../actions/likes_actions';

import { fetchPicture } from '../../actions/pictures_actions';

const mapStateToProps = (state, props) => {
    let carouselIndex = props.index;
    let imgUrl = props.picture.img_url;
    let title = props.picture.title;
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let photographerId = props.picture.photographer_id;
    let photographer = state.entities.users[photographerId];

    let photographerName;
    let photographerProfilePicId;
    if (photographer) {
        if (photographer.first_name) {
            photographerName = photographer.first_name + ' ' + photographer.last_name;
        } else {
            photographerName = photographer.email;
        }

        if (photographer.profile_picture_id) {
            photographerProfilePicId = photographer.profile_picture_id;
        }
    }

    let photographerProfilePicIdImgUrl;
    if (photographerProfilePicId && 
        state.entities.pictures[photographerProfilePicId]) {
        photographerProfilePicIdImgUrl = state.entities.pictures[photographerProfilePicId].img_url;
    }


    return ({
        currentUserId,
        currentUser,
        photographerId,
        photographerName,
        photographerProfilePicId,
        photographerProfilePicIdImgUrl,
        imgUrl,
        title,
        carouselIndex
    });
};

const mapDispatchToProps = (dispatch, props) => {
    return ({
        likePicture: like => dispatch(likePicture(like)),
        unlikePicture: like => dispatch(unlikePicture(like)),
        fetchPicture: id => dispatch(fetchPicture(id)),
        openPictureCarousel: carouselIndex => props.openPictureCarousel(carouselIndex),
        openLikeIndex: (likeIndex) => props.openLikeIndex(likeIndex)
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureItem);