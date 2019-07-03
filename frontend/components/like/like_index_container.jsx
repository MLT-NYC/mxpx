import { connect } from 'react-redux';
import LikeIndex from './like_index';

import { fetchUsers } from '../../actions/session_actions';


const mapStateToProps = (state, props) => {
    let likerIds = props.picture.likerIds;
    let likersCount = this.props.likerIds.length;

    return ({
        likerIds,
        likersCount
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUsers: users => dispatch(fetchUsers(users))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeIndex);