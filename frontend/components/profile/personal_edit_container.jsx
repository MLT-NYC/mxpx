import { connect } from 'react-redux';
import PersonalEdit from './personal_edit';
import { updateUser } from '../../actions/session_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let navBarPictureId = currentUser.pictureIds[0];
    let navBarPicture = state.entities.pictures[navBarPictureId];
    let followers = state.entities.users[currentUserId].followerIds;
    let followees = state.entities.users[currentUserId].followeeIds;
    let firstName = state.entities.users[currentUserId].first_name;
    let lastName = state.entities.users[currentUserId].last_name;
    let city = state.entities.users[currentUserId].city;
    let country = state.entities.users[currentUserId].country;
    let about = state.entities.users[currentUserId].about;

    firstName ? firstName = firstName : firstName = 'Your first name.';
    lastName ? lastName = lastName : lastName = 'Your last name.';
    city ? city = city : city = 'Your city.';
    country ? country = country : country = 'Your country.';
    about ? about = about : about = 'Tell the world your story.';

    return ({
        currentUser: currentUser,
        navBarPicture: navBarPicture,
        followers: followers,
        followees: followees,
        firstName: firstName,
        lastName: lastName,
        city: city,
        country: country,
        about: about
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updateUser: user => dispatch(updateUser(user))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalEdit);