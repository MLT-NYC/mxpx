import { connect } from 'react-redux';
import LikeIndexItem from './like_index_item';

import {
    createFollow,
    deleteFollow
} from '../../actions/follows_actions';

import { fetchPicture } from '../../actions/pictures_actions';

import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';


const mapStateToProps = (state, props) => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let likerId = props.likerId;
    let liker = state.entities.users[likerId];
    let likerName;
    let likerProfilePicId;
    let likersFollowCount;
    let likerProfilePicImgUrl;

    if (liker) {
        likerProfilePicId = liker.profile_picture_id;
        likersFollowCount = liker.followerIds.length;

        if (liker.first_name) {
            likerName = liker.first_name + " " + liker.last_name;
        } else {
            likerName = liker.email;
        }

        if (state.entities.pictures[likerProfilePicId]) {
            likerProfilePicImgUrl = state.entities.picture[likerProfilePicId].img_url;
        } else {
            likerProfilePicImgUrl = defaultProfilePic;
        }
    }

    return ({
        likerId,
        likerName,
        likersFollowCount,
        likerProfilePicId,
        currentUserId,
        currentUser,
        likerProfilePicImgUrl
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createFollow: follow => dispatch(createFollow(follow)),
        deleteFollow: follow => dispatch(deleteFollow(follow)),
        fetchPicture: id => dispatch(fetchPicture(id))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeIndexItem);