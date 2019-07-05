import { connect } from 'react-redux';
import Profile from './profile';
import { logOut } from '../../actions/session_actions';
import { fetchPictures } from '../../actions/pictures_actions';
import { fetchUsers } from '../../actions/session_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let navBarPicture = state.entities.pictures[currentUser.profile_picture_id];
    let pictureIds = currentUser.pictureIds.concat(currentUser.likedPictureIds);
    let pictures = [];
    let userIds = [];

    if (pictureIds.length > 0) {
        pictureIds.forEach(pictureId => {
            let picture = state.entities.pictures[pictureId];
            if (picture && currentUser.profile_picture_id !== picture.id && 
                currentUser.cover_picture_id !== picture.id) {
                    pictures.push(picture);
                }
        });
    }

    if (pictures.length > 0) {
        pictures.forEach(picture => {
            if (!userIds.includes(picture.photographer_id)){
                userIds.push(picture.photographer_id);
            }
        });
    }

    return ({
        currentUser: currentUser,
        pictures: pictures,
        navBarPicture: navBarPicture,
        pictureIds: pictureIds,
        userIds: userIds
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOut: () => dispatch(logOut()),
        fetchPictures: (pictureIds) => dispatch(fetchPictures(pictureIds)),
        fetchUsers: userIds => dispatch(fetchUsers(userIds))
    });

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);