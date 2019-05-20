import { connect } from 'react-redux';
import { updateUser } from '../../actions/session_actions';
import { createPicture } from '../../actions/pictures_actions';
import PersonalCoverEdit from './personal_cover_edit';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let cover_picture_id = state.entities.users[currentUserId].cover_picture_id;
    let coverPicture = state.entities.pictures[cover_picture_id];


    return ({
        currentUser: currentUser,
        coverPicture: coverPicture
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updateUser: user => dispatch(updateUser(user)),
        createPicture: picture => dispatch(createPicture(picture))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCoverEdit);