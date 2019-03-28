import { connect } from 'react-redux';
import Welcome from './welcome';
import { logOut } from '../../actions/session_actions';

const mapStateToProps = state => {
    let currentUserId = state.session.currentUserId;
    let currentUser = state.entities.users[currentUserId];
    return ({
        currentUser: currentUser
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOut: () => dispatch(logOut())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);