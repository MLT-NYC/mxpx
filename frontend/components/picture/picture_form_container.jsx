import { connect } from 'react-redux';
import PictureForm from './picture_form';
import { createPicture } from '../../actions/pictures_actions';

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
        createPicture: picture => dispatch(createPicture(picture))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureForm);