import { connect } from 'react-redux';
import LikeIndex from './like_index';

import {
    createFollow,
    deleteFollow
} from '../../actions/follows_actions';

const mapStateToProps = (state, props) => {
    let likerIds = props.picture.likerIds;

    return ({
        likerIds
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createFollow: follow => dispatch(createFollow(follow)),
        deleteFollow: follow => dispatch(deleteFollow(follow))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeIndex);