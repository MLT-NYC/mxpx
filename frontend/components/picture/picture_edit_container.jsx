import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PictureEdit from './picture_edit';
import { updatePicture, fetchPicture, deletePicture } from '../../actions/pictures_actions';

const mapStateToProps = (state, ownProps) => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];

    let pictureId = parseInt(ownProps.location.pathname.split('/')[3], 10);
    let picture = state.entities.pictures[pictureId];

    // let errors = state.errors.pictureForm;

    return ({
        currentUser: currentUser,
        pictureId: pictureId,
        picture: picture
        // errors: errors
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updatePicture: picture => dispatch(updatePicture(picture)),
        fetchPicture: id => dispatch(fetchPicture(id)),
        deletePicture: id => dispatch(deletePicture(id))
    });
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PictureEdit));