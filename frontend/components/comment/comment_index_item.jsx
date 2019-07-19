import React from 'react';
import SubCommentIndexItemContainer from './subcomment_index_item_container';

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOptionsModal: false,
            showReplyModal: false,
            submitButtonActive: false,
            subCommentBody: '',
            presentDate: new Date ()
        };

        this.toggleOptionsModal = this.toggleOptionsModal.bind(this);
        this.toggleReplyModal = this.toggleReplyModal.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.getCommentTime = this.getCommentTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelSubmit = this.cancelSubmit.bind(this);
    }

    toggleOptionsModal() {
        let { showOptionsModal } = this.state;

        this.setState({
            showOptionsModal: !showOptionsModal
        });
    }

    toggleReplyModal () {
        let { showReplyModal } = this.state;

        this.setState({
            showReplyModal: !showReplyModal
        });
    }

    deleteComment() {
        this.toggleOptionsModal();
        this.props.deletePictureComment(this.props.comment);
    }

    getCommentTime() {
        let commentDate = this.props.commentDate; 
        let commentHour = commentDate.getHours();
        let commentMinute = commentDate.getMinutes() < 10 ? '0' + commentDate.getMinutes() : commentDate.getMinutes().toString();
        let meridiem = commentHour < 12 || commentHour === 24 ? 'AM' : 'PM';
       
        if (commentHour > 12 && commentHour <= 24)  commentHour -= 12;

        commentHour.toString();
        
        return commentHour + ':' + commentMinute + ' ' + meridiem;
    }

    getDisplayedDate() {
        const month = {
            0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 
            6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
        };

        const weekday = {
            0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat'
        };

        let { presentDate } = this.state;
        let commentDate = this.props.commentDate; 
        let timeDifference = presentDate - commentDate;
        let second = 1000;
        let minute = second * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;

        let displayedDate;
        if (timeDifference <= second) {
            displayedDate = '1 second ago';
        } else if (timeDifference < minute) {
            displayedDate = `${Math.floor(timeDifference/second)} seconds ago`;
        } else if (timeDifference < (minute + (59*second))) {
            displayedDate = '1 minute ago';
        } else if (timeDifference >= (2*minute) && timeDifference < hour) {
            displayedDate = `${Math.floor(timeDifference/minute)} minutes ago`;
        } else if (timeDifference < day / 2) {
            displayedDate = this.getCommentTime();
        } else if (timeDifference < (2 * day)) {
            displayedDate = '1 day ago';
        } else if (timeDifference < week) {
            displayedDate = `${weekday[commentDate.getDay()]}`;
        } else {
            displayedDate = `${month[commentDate.getMonth()]} ${commentDate.getDate()}, ${commentDate.getFullYear()}`;
        }
   
        return displayedDate;
    }

    handleSubmit(e) {
        e.preventDefault();

        let { subCommentBody } = this.state;

        let subComment = {
            commentable_type: 'Comment',
            commentable_id: this.props.comment.id,
            author_id: this.props.currentUserId,
            body: subCommentBody
        };

        debugger
        this.props.createSubComment(subComment);

        this.setState({
            subCommentBody: '',
            showReplyModal: false,
            submitButtonActive: false
        });
    }

    cancelSubmit(e) {
        e.preventDefault();

        this.setState({
            subCommentBody: '',
            showReplyModal: false,
            submitButtonActive: false
        });
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value,
            submitButtonActive: true
        });
    }

    componentDidMount() {
        if (!this.props.commentAuthor) {
            this.props.fetchUsers([this.props.commentAuthorId]);
        }
        
        
        if (this.props.subCommentIds.length > 0) {
            debugger
            this.props.fetchSubComments(this.props.comment.id);
        }
        
        this.timer = setInterval(
            () => this.tick(),
            10000
        );
    }

    tick() {
        this.setState({
            presentDate: new Date ()
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.commentAuthorProfilePicId != this.props.commentAuthorProfilePicId) {
            this.props.fetchPicture(this.props.commentAuthorProfilePicId);
        }

        // debugger
        if (prevProps.subCommentIds.toString() != this.props.subCommentIds.toString()){
            // debugger
            this.props.fetchSubComments(this.props.comment.id);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let optionsIcon;
        if (this.props.currentUserId === this.props.commentAuthorId) {
            optionsIcon = (
                <div className='commentOptionsIcon' onClick={this.toggleOptionsModal}><i className="fas fa-ellipsis-h"></i></div>
            )
        }

        let optionsModal;
        if (this.state.showOptionsModal) {
            optionsModal = (
                <div className='optionsModal'>
                    <div className='optionsModal-deleteButton' onClick={this.deleteComment}>
                        <div className='optionsModal-arrow'></div>
                        <div className='optionsModal-deleteButton-icon'>
                            <i className="far fa-trash-alt"></i>
                            Delete
                        </div>
                    </div>
                </div>
            )
        }

        let date = this.getDisplayedDate ();
        let displayedDate = (
            <div className='commentDisplayedDate'>
                {date}
            </div>
        );

        let submitButton;
        let cancelSubmitButton;
        let createCommentFormFieldClass;
        if (this.state.submitButtonActive) {
            if (this.state.subCommentBody.length > 0) {
                submitButton = <input className='commentSubmitButton' type="submit" value='Comment' />;
            } else {
                submitButton = <div className='commentSubmitButton-mock'>Comment</div>
            }
            cancelSubmitButton = <div className='commentCancelSubmitButton' onClick={this.cancelSubmit}>Cancel</div>
            createCommentFormFieldClass = 'createCommentForm-field-active';
        } else {
            createCommentFormFieldClass = 'createCommentForm-field-inactive';
        }

        let currentUserProfilePicImgUrl;
        if (this.props.currentUserProfilePicImgUrl) {
            currentUserProfilePicImgUrl = this.props.currentUserProfilePicImgUrl;
        } else {
            currentUserProfilePicImgUrl = this.props.defaultProfilePic;
        }

        let reply;
        if (this.state.showReplyModal) {
            reply = (
                <form className='createCommentForm' onSubmit={this.handleSubmit}>
                    <div className='createCommentForm-mid'>
                        <img className='commentIndex-authorProfilePic' src={currentUserProfilePicImgUrl} />
                        <div className={createCommentFormFieldClass}>
                            <textarea className='createFormTextArea'
                                type='text'
                                placeholder='Add a comment'
                                value={this.state.subCommentBody}
                                onChange={this.update('subCommentBody')}>
                            </textarea>

                            <div className='comment-icon'><i className="far fa-comment"></i></div>
                        </div>
                    </div>

                    <div className='createCommentForm-bottom'>
                        {cancelSubmitButton}
                        {submitButton}
                    </div>
                </form>
            )
        }

        let subComments = this.props.subComments.map((subComment, index) => {
            return (
                <SubCommentIndexItemContainer key={index} subComment={subComment} />
            )
        })

        let replyButton = <div onClick={this.toggleReplyModal}>Reply</div>

        return (
            <ul>
                <div className='pictureComment'>
                    <img className='commentAuthorProfilePic' src={this.props.commentAuthorProfilePicImgUrl}/>
                    <div className='commentAuthorName'>{this.props.commentAuthorName}</div>
                    <div className='commentBody'>{this.props.comment.body}</div>
                    {optionsIcon}
                    {optionsModal}
                    {displayedDate}
                    {replyButton}
                </div>
                {reply}
                {subComments}
            </ul>
        )
    }
}

export default CommentIndexItem;