import { connect } from 'react-redux';
import PictureNew from './picture_new';
import { createPicture, clearPictureErrors } from '../../actions/pictures_actions';
import { logOut } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let navBarPicture = state.entities.pictures[currentUser.profile_picture_id];
    


    return ({
        currentUser: currentUser,
        navBarPicture: navBarPicture
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createPicture: picture => dispatch(createPicture(picture)),
        logOut: () => dispatch(logOut())
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PictureNew));