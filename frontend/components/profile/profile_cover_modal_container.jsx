import { connect } from 'react-redux'
import ProfileCoverModal from './profile_cover_modal';
import { updatePicture } from '../../actions/pictures_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let pictures = [];

    if (currentUser.pictureIds) {
        currentUser.pictureIds.forEach((id) => {
            let picture = state.entities.pictures[id];
            if (picture && !picture.cover & !picture.profile) {
                pictures.push(state.entities.pictures[id]);
            }
        });
    }

    return ({
        currentUser: currentUser,
        pictures: pictures,
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updatePicture: picture => dispatch(updatePicture(picture))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCoverModal);