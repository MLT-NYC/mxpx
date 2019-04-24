import { connect } from 'react-redux';
import Profile from './profile';
import { logOut } from '../../actions/session_actions';
import { fetchPictures } from '../../actions/pictures_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let pictures = [];

    if (currentUser.pictureIds) {
        currentUser.pictureIds.forEach((id) => {
            if (state.entities.pictures[id]) {
                pictures.push(state.entities.pictures[id]);
            }
        });
    }
    // debugger
    return ({
        currentUser: currentUser,
        pictures: pictures,
        navBarPicture: pictures[0]
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOut: () => dispatch(logOut()),
        fetchPictures: () => dispatch(fetchPictures())
    });

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);