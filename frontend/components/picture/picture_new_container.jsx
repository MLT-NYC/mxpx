import { connect } from 'react-redux';
import PictureNew from './picture_new';
import { createPicture, clearPictureErrors } from '../../actions/pictures_actions';
import { logOut } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];

    let errors = state.errors.pictureForm;

    return ({
        currentUser: currentUser,
        errors: errors
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createPicture: picture => dispatch(createPicture(picture)),
        clearPictureErrors: () => dispatch(clearPictureErrors()),
        logOut: () => dispatch(logOut())
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PictureNew));