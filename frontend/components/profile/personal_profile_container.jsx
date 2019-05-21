import { connect } from 'react-redux';
import PersonalProfile from './personal_profile';
import { logOut } from '../../actions/session_actions';
import { fetchPictures } from '../../actions/pictures_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    let navBarPicture = state.entities.pictures[currentUser.profile_picture_id];
    let coverPicture = state.entities.pictures[currentUser.cover_picture_id];
    let followers = state.entities.users[currentUserId].followerIds;
    let followees = state.entities.users[currentUserId].followeeIds;
    let firstName = state.entities.users[currentUserId].first_name;
    let lastName = state.entities.users[currentUserId].last_name;
    let email = state.entities.users[currentUserId].email;
    let city = state.entities.users[currentUserId].city;
    let country = state.entities.users[currentUserId].country;
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
        navBarPicture: navBarPicture,
        coverPicture: coverPicture,
        followers: followers,
        followees: followees,
        firstName: firstName,
        lastName: lastName,
        city: city,
        country: country,
        email: email
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOut: () => dispatch(logOut()),
        fetchPictures: () => dispatch(fetchPictures())
    });

};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalProfile);