import { connect } from 'react-redux';
import PictureCarousel from './picture_carousel';

import { 
    createFollow,
    deleteFollow
    } from '../../actions/follows_actions';

import {
    likePicture,
    unlikePicture
} from '../../actions/likes_actions';

const mapStateToProps = state => {
    return ({

    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createFollow: follow => dispatch(createFollow(follow)),
        deleteFollow: follow => dispatch(deleteFollow(follow)),
        likePicture: like => dispatch(likePicture(like)),
        unlikePicture: like => dispatch(unlikePicture(like))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureCarousel);