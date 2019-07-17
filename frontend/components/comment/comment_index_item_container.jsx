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

    debugger
    
    let commentFullDate =  new Date(comment.createdDate);
    let commentYear = commentFullDate.getFullYear();
    let commentMonth = commentFullDate.getMonth();
    let commentDate = commentFullDate.getDate();
    let commentHour = commentFullDate.getHours();
    let commentMinute = commentFullDate.getMinutes();
    let commentSecond = commentFullDate.getSeconds();

    debugger
    const monthMap = {
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

    const weekMap = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
    };

    return ({
        comment,
        commentAuthorId,
        commentAuthor,
        commentAuthorProfilePicId,
        commentAuthorProfilePicImgUrl,
        commentAuthorName,
        currentUserId,
        commentFullDate,
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