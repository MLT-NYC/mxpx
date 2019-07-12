import { connect } from 'react-redux';
import CommentIndex from './comment_index';

import { 
    fetchPictureComments, createPictureComment 
} from '../../actions/comment_actions';

const mapStateToProps = (state, props) => {
    let pictureId = props.pictureId;
    let authorId = state.entities.users[state.session.currentUserId].id;
    let authorProfilePicImgUrl = state.entities.pictures[state.entities.users[state.session.currentUserId].profile_picture_id].img_url;

    return ({
        pictureId,
        authorId,
        authorProfilePicImgUrl
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchPictureComments: pictureId => dispatch(fetchPictureComments(pictureId)),
        createPictureComment: comment => dispatch(createPictureComment(comment))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);