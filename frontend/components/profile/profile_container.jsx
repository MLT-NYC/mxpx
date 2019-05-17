import { connect } from 'react-redux';
import Profile from './profile';
import { logOut } from '../../actions/session_actions';
import { fetchPictures } from '../../actions/pictures_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    // let navBarPictureId = currentUser.pictureIds[0];
    let navBarPicture = state.entities.pictures[currentUser.profile_picture_id];
    let pictures = [];

    if (currentUser.pictureIds) {
        currentUser.pictureIds.forEach((id) => {
            if (state.entities.pictures[id]) {
                pictures.push(state.entities.pictures[id]);
            }
        });
    }

    return ({
        currentUser: currentUser,
        pictures: pictures,
        navBarPicture: navBarPicture
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOut: () => dispatch(logOut()),
        fetchPictures: () => dispatch(fetchPictures())
    });

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);