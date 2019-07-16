import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

import { fetchUsers } from '../../actions/session_actions';
import { fetchPicture } from '../../actions/pictures_actions';
import { deletePictureComment } from '../../actions/comment_actions';

const mapStateToProps = (state, props) => {
    let comment = props.comment;
    let currentUserId = state.session.currentUserId;

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
    
    let commentFullDate =  comment.createdDate.split('T')[0];
    let commentYear = parseInt(commentFullDate.split('-')[0], 10);
    let commentMonth = parseInt(commentFullDate.split('-')[1], 10) - 1;
    let commentDate = parseInt(commentFullDate.split('-')[2], 10);
    
    let commentFullTime = comment.createdDate.split('T')[1];
    let commentHour = parseInt(commentFullTime.split(':')[0], 10);
    let commentMinute = parseInt(commentFullTime.split(':')[1], 10);
    let commentSecond = parseInt(commentFullTime.split(':')[2].split('.')[0], 10);

    let monthMap = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };

    let weekMap = {
        0: 'Mon',
        1: 'Tue',
        2: 'Wed',
        3: 'Thu',
        4: 'Fri',
        5: 'Sat',
        6: 'Sun'
    };

    return ({
        comment,
        commentAuthorId,
        commentAuthor,
        commentAuthorProfilePicId,
        commentAuthorProfilePicImgUrl,
        commentAuthorName,
        currentUserId,
        commentYear,
        commentMonth,
        commentDate,
        commentHour,
        commentMinute,
        commentSecond,
        monthMap,
        weekMap
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUsers: userIds => dispatch(fetchUsers(userIds)),
        fetchPicture: pictureId => dispatch(fetchPicture(pictureId)),
        deletePictureComment: comment => dispatch(deletePictureComment(comment))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);