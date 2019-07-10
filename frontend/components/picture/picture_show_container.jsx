import { connect } from 'react-redux';
import PictureShow from './picture_show';
import { fetchPictures } from '../../actions/pictures_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let pictureIds = [];
    let pictures = [];

    if (currentUser.pictureIds) {
        currentUser.pictureIds.forEach(id => {
            pictureIds.push(id);
        });
    } 

    if (pictureIds.length > 0) {
        pictureIds.forEach((id) => {
            let picture = state.entities.pictures[id];
            if (picture && picture.showcase) {
                pictures.push(picture);
            }
        });
    }

    return ({
        currentUser: currentUser,
        pictures: pictures,
        pictureIds: pictureIds
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchPictures: pictureIds => dispatch(fetchPictures(pictureIds))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureShow);