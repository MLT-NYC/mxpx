import { connect } from 'react-redux';
import PictureCarousel from './picture_carousel';

import { 
    createFollow,
    deleteFollow
    } from '../../actions/follows_actions';

import {
    likePicture,
    unlikePicture
} from '../../actions/likes_actions';

const mapStateToProps = (state, props) => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let allPictures = state.entities.pictures;
    let allUsers = state.entities.users;
    let carouselPictures = props.carouselPictures;
    let currentIndex = props.currentIndex;

    return ({
        currentUser: currentUser,
        allPictures: allPictures,
        allUsers: allUsers,
        carouselPictures: carouselPictures,
        currentIndex: currentIndex
    });
};

const mapDispatchToProps = (dispatch, props) => {
    return ({
        createFollow: follow => dispatch(createFollow(follow)),
        deleteFollow: follow => dispatch(deleteFollow(follow)),
        likePicture: like => dispatch(likePicture(like)),
        unlikePicture: like => dispatch(unlikePicture(like)),
        closePictureCarousel: () => props.closePictureCarousel()
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureCarousel);