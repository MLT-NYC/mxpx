import React from 'react';

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);
        // create subComment component
        // in componentdidmount, if comment has subCommentIds, fetch those comments.
        // in container, generate subcomments array
        // in componentdidupdate, if previous subcomments array is not the same as the current

        this.state = {
            showOptionsModal: false,
            dateTime: new Date ()
        };

        this.toggleOptionsModal = this.toggleOptionsModal.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    toggleOptionsModal() {
        let { showOptionsModal } = this.state;

        this.setState({
            showOptionsModal: !showOptionsModal
        });
    }

    deleteComment() {
        this.props.deletePictureComment(this.props.comment);
    }

    getDisplayedDate() {
        let { dateTime } = this.state;

        let currentYear = dateTime.getFullYear();
        let currentMonth = dateTime.getMonth();
        let currentDate = dateTime.getDate();
        let currentHour = dateTime.getHours();
        let currentMinute = dateTime.getMinutes();
        let currentSecond = dateTime.getSeconds();

        let commentFullDate = this.props.commentFullDate; 
        let commentYear = this.props.commentYear;
        let commentMonth = this.props.commentMonth;
        let commentDate = this.props.commentDate;
        let commentHour = this.props.commentHour;
        let commentMinute = this.props.commentMinute;
        let commentSecond = this.props.commentSecond;


        let date;
        debugger
        if (
            currentYear === commentYear &&
            currentMonth === commentMonth &&
            currentDate === commentDate &&
            currentHour === commentHour &&
            currentMinute === commentMinute && 
            Math.abs(currentSecond - commentSecond) < 60
        ) {
            if (Math.abs(currentSecond - commentSecond) === 1){
                date = `1 second ago`;
            } else {
                date = `${Math.abs(currentSecond - commentSecond)} seconds ago`;
            }
            
        } else if (
            currentYear === commentYear &&
            currentMonth === commentMonth &&
            currentDate === commentDate &&
            currentHour === commentHour &&
            Math.abs(currentMinute - commentMinute) < 60
        ) {
            if (Math.abs(currentMinute - commentMinute) === 1) {
                date = `1 minute ago`;
            } else {
                date = `${Math.abs(currentMinute - commentMinute)} minutes ago`;
            }

        } else if (
            currentYear === commentYear &&
            currentMonth === commentMonth &&
            currentDate === commentDate &&
            Math.abs(currentHour - commentHour) < 24
        ) {
            if (Math.abs(currentHour - commentHour) === 1) {
                date = `1 hour ago`;
            } else {
                date = `${Math.abs(currentHour - commentHour)} hours ago`;
            }
            
        } else if (
            currentYear === commentYear &&
            currentMonth === commentMonth &&
            currentDate - commentDate < 7
        ) {
            date = `${this.props.weekMap[commentFullDate.getDay()]}`;
        } else if (
            currentYear === commentYear&&
            currentMonth === commentMonth &&
            currentDate - commentDate >= 7
        ) {
            date = `${this.props.monthMap[commentMonth]} ${commentDate}`;
        } else if (currentYear - commentYear > 0) {
            date = `${this.props.monthMap[commentMonth]} ${commentDate}, ${commentYear}`;
        } 

        return date;
    }

    componentDidMount() {
        if (!this.props.commentAuthor) {
            this.props.fetchUsers([this.props.commentAuthorId]);
        }     
        
        this.timer = setInterval(
            () => this.tick(),
            60000
        )
    }

    tick() {
        this.setState({
            dateTime: new Date ()
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.commentAuthorProfilePicId != this.props.commentAuthorProfilePicId) {
            this.props.fetchPicture(this.props.commentAuthorProfilePicId);
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

        return (
            <>
                <img className='commentAuthorProfilePic' src={this.props.commentAuthorProfilePicImgUrl}/>
                <div className='commentAuthorName'>{this.props.commentAuthorName}</div>
                <div className='commentBody'>{this.props.comment.body}</div>
                {optionsIcon}
                {optionsModal}
                {displayedDate}
            </>
        )
    }
}

export default CommentIndexItem;