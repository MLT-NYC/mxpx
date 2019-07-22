import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

import { fetchUsers } from '../../actions/session_actions';
import { fetchPicture } from '../../actions/pictures_actions';
import { 
    deletePictureComment,
    createSubComment,
    fetchSubComments
} from '../../actions/comment_actions';

const mapStateToProps = (state, props) => {
    let comment = props.comment;
    let currentUserId = state.session.currentUserId;
    let currentUserProfilePicImgUrl = state.entities.pictures[state.entities.users[currentUserId].profile_picture_id].img_url;

    let commentAuthorId = comment.authorId;
    let commentAuthor = state.entities.users[commentAuthorId];
    let commentAuthorName;
    let commentAuthorProfilePicId;

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
    if (commentAuthorProfilePic) {
        commentAuthorProfilePicImgUrl = commentAuthorProfilePic.img_url;
        if (!commentAuthorProfilePicImgUrl) {
            commentAuthorProfilePicImgUrl = defaultProfilePic;
        }
    }
    
    let commentDate =  new Date(comment.createdDate);

    let subCommentIds = comment.subCommentIds;
    let subComments = [];
    if (subCommentIds.length > 0) {
        subCommentIds.forEach(subCommentId => {
            let subComment = state.entities.comments[subCommentId];
            if (subComment) {
                subComments.push(subComment);
            }
        });
    }

    return ({
        comment,
        commentAuthorId,
        commentAuthor,
        commentAuthorProfilePicId,
        commentAuthorProfilePicImgUrl,
        commentAuthorName,
        currentUserId,
        commentDate,
        subCommentIds,
        subComments,
        currentUserProfilePicImgUrl,
        defaultProfilePic
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUsers: userIds => dispatch(fetchUsers(userIds)),
        fetchPicture: pictureId => dispatch(fetchPicture(pictureId)),
        deletePictureComment: comment => dispatch(deletePictureComment(comment)),
        fetchSubComments: commentId => dispatch(fetchSubComments(commentId)),
        createSubComment: subComment => dispatch(createSubComment(subComment))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);