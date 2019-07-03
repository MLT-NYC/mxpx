import { connect } from 'react-redux';
import LikeIndexItem from './like_index_item';

import {
    createFollow,
    deleteFollow
} from '../../actions/follows_actions';

const mapStateToProps = (state, props) => {
    let likerId = props.likerId;

    return ({
        likerId
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createFollow: follow => dispatch(createFollow(follow)),
        deleteFollow: follow => dispatch(deleteFollow(follow))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeIndexItem);