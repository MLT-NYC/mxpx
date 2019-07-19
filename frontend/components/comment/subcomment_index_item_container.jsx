import { connect } from 'react-redux';
import SubCommentIndexItem from './subcomment_index_item';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

import { fetchUsers } from '../../actions/session_actions';
import { fetchPicture } from '../../actions/pictures_actions';
import { deleteSubComment } from '../../actions/comment_actions';

const mapStateToProps = (state, props) => {
    let subComment = props.subComment;
    let currentUserId = state.session.currentUserId;

    let subCommentAuthorId = subComment.authorId;
    let subCommentAuthor = state.entities.users[subCommentAuthorId];
    let subCommentAuthorName;
    let subCommentAuthorProfilePicId;

    if (subCommentAuthor) {
        subCommentAuthorProfilePicId = subCommentAuthor.profile_picture_id;
        if (subCommentAuthor.first_name) {
            subCommentAuthorName = subCommentAuthor.first_name + " " + subCommentAuthor.last_name;
        } else {
            subCommentAuthorName = subCommentAuthor.email;
        }
    }

    let subCommentAuthorProfilePic = state.entities.pictures[subCommentAuthorProfilePicId];
    let subCommentAuthorProfilePicImgUrl;
    if (subCommentAuthorProfilePic) {
        subCommentAuthorProfilePicImgUrl = subCommentAuthorProfilePic.img_url;
        if (!subCommentAuthorProfilePicImgUrl) {
            subCommentAuthorProfilePicImgUrl = defaultProfilePic;
        }
    }

    let subCommentDate = new Date(subComment.createdDate);
    
    return ({
        subComment,
        subCommentAuthorId,
        subCommentAuthor,
        subCommentAuthorProfilePicId,
        subCommentAuthorProfilePicImgUrl,
        subCommentAuthorName,
        currentUserId, 
        subCommentDate
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUsers: userIds => dispatch(fetchUsers(userIds)),
        fetchPicture: pictureId => dispatch(fetchPicture(pictureId)),
        deleteSubComment: subComment => dispatch(deleteSubComment(subComment))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCommentIndexItem);