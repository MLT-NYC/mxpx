import React from 'react';

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // debugger
        if (!this.props.commentAuthor) {
            this.props.fetchUsers([this.props.commentAuthorId]);
        }         
    }

    componentDidUpdate(prevProps, props) {
        // debugger
        if (prevProps.commentAuthorProfilePicId != props.commentAuthorProfilePicId) {
            // debugger
            this.props.fetchPicture(commentAuthorProfilePicId);
        }
    }

    render() {

        return (
            <>
                <img className='commentAuthorProfilePic' src={this.props.commentAuthorProfilePicImgUrl}/>
                <div className='commentAuthorName'>{this.props.commentAuthorName}</div>
                <div className='commentBody'>{this.props.comment.body}</div>
            </>
        )
    }
}

export default CommentIndexItem;