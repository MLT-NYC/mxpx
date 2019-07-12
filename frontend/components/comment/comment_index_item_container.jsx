import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

import { fetchUsers } from '../../actions/session_actions';
import { fetchPicture } from '../../actions/pictures_actions';
import { fetchSubComments } from '../../actions/comment_actions';

const mapStateToProps = (state, props) => {
    let comment = props.comment;

    let commentAuthorId = comment.authorId;
    let commentAuthor = state.entities.users[commentAuthorId];
    let commentAuthorName;
    let commentAuthorProfilePicId;
    // debugger
    if (commentAuthor) {
        commentAuthorProfilePicId = commentAuthor.profile_picture_id;
        if (commentAuthor.first_name) {
            commentAuthorName = commentAuthor.first_name + " " + commentAuthor.last_name;
        } else {
            commentAuthorName = commentAuthor.email;
        }
    }
    let commentAuthorProfilePic = state.entities.pictures[commentAuthorProfilePicId];
    let commentAuthorProfilePicImgUrl;
    // debugger
    if (commentAuthorProfilePic) {
        commentAuthorProfilePicImgUrl = commentAuthorProfilePic.img_url;
        if (!commentAuthorProfilePicImgUrl) {
            commentAuthorProfilePicImgUrl = defaultProfilePic;
        }
    }
    // debugger
    return ({
        comment,
        commentAuthorId,
        commentAuthor,
        commentAuthorProfilePicId,
        commentAuthorProfilePicImgUrl,
        commentAuthorName
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUsers: userIds => dispatch(fetchUsers(userIds)),
        fetchPicture: pictureId => dispatch(fetchPicture(pictureId))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);