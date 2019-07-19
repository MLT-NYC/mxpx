import React from 'react';

class SubCommentIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOptionsModal: false,
            presentDate: new Date()
        };

        this.toggleOptionsModal = this.toggleOptionsModal.bind(this);
        this.deleteSubComment = this.deleteSubComment.bind(this);
        this.getCommentTime = this.getCommentTime.bind(this);
    }

    toggleOptionsModal() {
        let { showOptionsModal } = this.state;

        this.setState({
            showOptionsModal: !showOptionsModal
        });
    }

    deleteSubComment() {
        this.toggleOptionsModal();
        this.props.deleteSubComment(this.props.subComment);
    }

    getCommentTime() {
        let subCommentDate = this.props.subCommentDate;
        let subCommentHour = subCommentDate.getHours();
        let subCommentMinute = subCommentDate.getMinutes() < 10 ? '0' + subCommentDate.getMinutes() : subCommentDate.getMinutes().toString();
        let meridiem = subCommentHour < 12 || subCommentHour === 24 ? 'AM' : 'PM';

        if (subCommentHour > 12 && subCommentHour <= 24) subCommentHour -= 12;

        subCommentHour.toString();

        return subCommentHour + ':' + subCommentMinute + ' ' + meridiem;
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
        let subCommentDate = this.props.subCommentDate;
        let timeDifference = presentDate - subCommentDate;
        let second = 1000;
        let minute = second * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;

        let displayedDate;
        if (timeDifference <= second) {
            displayedDate = '1 second ago';
        } else if (timeDifference < minute) {
            displayedDate = `${Math.floor(timeDifference / second)} seconds ago`;
        } else if (timeDifference < (minute + (59 * second))) {
            displayedDate = '1 minute ago';
        } else if (timeDifference >= (2 * minute) && timeDifference < hour) {
            displayedDate = `${Math.floor(timeDifference / minute)} minutes ago`;
        } else if (timeDifference < day / 2) {
            displayedDate = this.getCommentTime();
        } else if (timeDifference < (2 * day)) {
            displayedDate = '1 day ago';
        } else if (timeDifference < week) {
            displayedDate = `${weekday[subCommentDate.getDay()]}`;
        } else {
            displayedDate = `${month[subCommentDate.getMonth()]} ${subCommentDate.getDate()}, ${subCommentDate.getFullYear()}`;
        }

        return displayedDate;
    }

    tick() {
        this.setState({
            presentDate: new Date()
        });
    }

    componentDidMount() {
        if (!this.props.subCommentAuthor) {
            this.props.fetchUsers([this.props.subCommentAuthorId]);
        }

        this.timer = setInterval(
            () => this.tick(),
            10000
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.subCommentAuthorProfilePicId != this.props.subCommentAuthorProfilePicId) {
            this.props.fetchPicture(this.props.subCommentAuthorProfilePicId);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let optionsIcon;
        if (this.props.currentUserId === this.props.subCommentAuthorId) {
            optionsIcon = (
                <div className='commentOptionsIcon' onClick={this.toggleOptionsModal}><i className="fas fa-ellipsis-h"></i></div>
            )
        }

        let optionsModal;
        if (this.state.showOptionsModal) {
            optionsModal = (
                <div className='optionsModal'>
                    <div className='optionsModal-deleteButton' onClick={this.deleteSubComment}>
                        <div className='optionsModal-arrow'></div>
                        <div className='optionsModal-deleteButton-icon'>
                            <i className="far fa-trash-alt"></i>
                            Delete
                        </div>
                    </div>
                </div>
            )
        }

        let date = this.getDisplayedDate();
        let displayedDate = (
            <div className='commentDisplayedDate'>
                {date}
            </div>
        );

        return (
            <div className='subComment'>
                <img className='commentAuthorProfilePic' src={this.props.subCommentAuthorProfilePicImgUrl} />
                <div className='commentAuthorName'>{this.props.subCommentAuthorName}</div>
                <div className='commentBody'>{this.props.subComment.body}</div>
                {optionsIcon}
                {optionsModal}
                {displayedDate}
            </ div>
        )
    }
}

export default SubCommentIndexItem;