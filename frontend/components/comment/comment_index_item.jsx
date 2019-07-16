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

        let date;
        if (
            currentYear === this.props.commentYear &&
            currentMonth === this.props.commentMonth &&
            currentDate === this.props.commentDate &&
            currentHour === this.props.commentHour &&
            currentMinute === this.props.commentMinute && 
            currentSecond - this.props.commentSecond < 60
        ) {

            if (this.props.commentSecond - currentSecond === 1){
                date = `1 second ago`;
            } else {
                date = `${this.props.commentSecond - currentSecond} seconds ago`;
            }
            
        } else if (
            currentYear === this.props.commentYear &&
            currentMonth === this.props.commentMonth &&
            currentDate === this.props.commentDate &&
            currentHour === this.props.commentHour &&
            currentMinute - this.props.commentMinute < 60
        ) {

            if (this.props.commentMinute - currentMinute === 1) {
                date = `1 minute ago`;
            } else {
                date = `${this.props.commentMinute - currentMinute} minutes ago`;
            }

        } else if (
            currentYear === this.props.commentYear &&
            currentMonth === this.props.commentMonth &&
            currentDate === this.props.commentDate &&
            currentHour - this.props.commentHour < 24
        ) {

            if (this.props.commentHour - currentHour === 1) {
                date = `1 hour ago`;
            } else {
                date = `${this.props.commentHour - currentHour} hours ago`;
            }
            
        } else if (
            currentYear === this.props.commentYear &&
            currentMonth === this.props.commentMonth &&
            currentDate - this.props.commentDate < 7
        ) {
            date = `${this.props.weekMap[dateTime.getDay()]}`;
        } else if (
            currentYear === this.props.commentYear &&
            currentMonth === this.props.commentMonth &&
            currentDate - this.props.commentDate >= 7
        ) {
            date = `${this.props.monthMap[this.props.commentMonth]} ${this.props.commentDate}`;
        } else if (currentYear - this.props.commentYear > 0) {
            date = `${this.props.monthMap[this.props.commentMonth]} ${this.props.commentDate}, ${this.props.commentYear}`;
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