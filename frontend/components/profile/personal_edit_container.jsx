import { connect } from 'react-redux';
import PersonalEdit from './personal_edit';
import { updateUser } from '../../actions/session_actions';
import { createPicture, fetchPictures } from '../../actions/pictures_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let navBarPicture = state.entities.pictures[currentUser.profile_picture_id];
    let followers = state.entities.users[currentUserId].followerIds;
    let followees = state.entities.users[currentUserId].followeeIds;
    let firstName = state.entities.users[currentUserId].first_name;
    let lastName = state.entities.users[currentUserId].last_name;
    let city = state.entities.users[currentUserId].city;
    let country = state.entities.users[currentUserId].country;
    let about = state.entities.users[currentUserId].about;
    let profile_picture_id = state.entities.users[currentUserId].profile_picture_id;
    let cover_picture_id = state.entities.users[currentUserId].cover_picture_id;
    let coverPicture = state.entities.pictures[cover_picture_id];
    let errors = state.errors.pictureErrors;

    firstName ? firstName = firstName : firstName = 'Your first name';
    lastName ? lastName = lastName : lastName = 'Your last name';
    city ? city = city : city = 'Your city';
    country ? country = country : country = 'Your country';
    about ? about = about : about = 'Tell the world your story.';

    return ({
        currentUserId: currentUserId,
        navBarPicture: navBarPicture,
        coverPicture: coverPicture,
        followers: followers,
        followees: followees,
        firstName: firstName,
        lastName: lastName,
        city: city,
        country: country,
        about: about,
        profile_picture_id: profile_picture_id,
        cover_picture_id: cover_picture_id,
        errors: errors
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updateUser: user => dispatch(updateUser(user)),
        createPicture: picture => dispatch(createPicture(picture)),
        fetchPictures: () => dispatch(fetchPictures())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalEdit);