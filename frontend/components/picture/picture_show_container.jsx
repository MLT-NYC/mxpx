import { connect } from 'react-redux';
import PictureShow from './picture_show';
import { fetchPictures } from '../../actions/pictures_actions';

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
        fetchPictures: () => dispatch(fetchPictures())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureShow);