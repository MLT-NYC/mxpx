import { connect } from 'react-redux';
import PictureDiscover from "./picture_discover";
import {
    fetchUsers,
    logOut
} from "../../actions/session_actions";
import { fetchPictures } from '../../actions/pictures_actions'

const mapStateToProps = state => {
    const currentUserId = state.session.currentUserId;
    const currentUser = state.entities.users[currentUserId];
    const navBarPicture = state.entities.pictures[currentUser.profile_picture_id];
    const followerIds = state.entities.users[currentUserId].followerIds;
    const followeeIds = state.entities.users[currentUserId].followeeIds;
    const userIds  = followerIds.concat(followeeIds);
    let users = [];
    let pictureIds = [];
    let pictures = [];

    if (userIds.length > 0) {
        debugger
        userIds.forEach(id => {
            let user = state.entities.users[id];
            if (user) users.push(user)
        });
    }

    debugger
    if (users.length > 0) {
        debugger
        users.forEach(user => {
            debugger
            let userPictureIds = user.pictureIds;
            pictureIds += userPictureIds;
        })
    }

    if (pictureIds.length > 0) {
        pictureIds.forEach((id) => {
            let picture = state.entities.pictures[id];
            if (picture) {
                pictures.push(picture);
            }
        });
    }
    return ({
        currentUser,
        navBarPicture,
        userIds,
        pictureIds,
        pictures
    })
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUsers: userIds => dispatch(fetchUsers(userIds)),
        logOut: () => dispatch(logOut()),
        fetchPictures: pictureIds => dispatch(fetchPictures(pictureIds))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureDiscover);
