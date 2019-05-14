import { connect } from 'react-redux';
import PersonalEdit from './personal_edit';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let navBarPictureId = currentUser.pictureIds[0];
    let navBarPicture = state.entities.pictures[navBarPictureId];
    let followers = state.entities.users[currentUserId].followerIds;
    let followees = state.entities.users[currentUserId].followeeIds;
    let firstName = state.entities.users[currentUserId].first_name;
    let lastName = state.entities.users[currentUserId].last_name;
    let email = state.entities.users[currentUserId].email;
    let about = state.entities.users[currentUserId].about;

    return ({
        currentUser: currentUser,
        navBarPicture: navBarPicture,
        followers: followers,
        followees: followees,
        firstName: firstName,
        lastName: lastName,
        email: email,
        about: about
    });
};

const mapDispatchToProps = dispatch => {
    return ({

    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalEdit);