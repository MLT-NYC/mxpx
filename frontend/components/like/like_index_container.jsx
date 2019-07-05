import { connect } from 'react-redux';
import LikeIndex from './like_index';

import { fetchUsers } from '../../actions/session_actions';

const mapStateToProps = (state, props) => {
    let likerIds = props.likerIds;
    let likersCount = likerIds.length;

    return ({
        likerIds,
        likersCount
    });
};

const mapDispatchToProps = (dispatch, props) => {
    return ({
        fetchUsers: userIds => dispatch(fetchUsers(userIds)),
        toggleLikeIndex: () => props.toggleLikeIndex()
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeIndex);