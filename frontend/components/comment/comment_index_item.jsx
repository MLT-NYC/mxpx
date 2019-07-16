import React from 'react';

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);
        // create subComment component
        // in componentdidmount, if comment has subCommentIds, fetch those comments.
        // in container, generate subcomments array
        // in componentdidupdate, if previous subcomments array is not the same as the current

        this.state = {
            showOptionsModal: false
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

    componentDidMount() {
        if (!this.props.commentAuthor) {
            this.props.fetchUsers([this.props.commentAuthorId]);
        }         
    }

    componentDidUpdate(prevProps) {
        if (prevProps.commentAuthorProfilePicId != this.props.commentAuthorProfilePicId) {
            this.props.fetchPicture(this.props.commentAuthorProfilePicId);
        }
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

        return (
            <>
                <img className='commentAuthorProfilePic' src={this.props.commentAuthorProfilePicImgUrl}/>
                <div className='commentAuthorName'>{this.props.commentAuthorName}</div>
                <div className='commentBody'>{this.props.comment.body}</div>
                {optionsIcon}
                {optionsModal}
            </>
        )
    }
}

export default CommentIndexItem;