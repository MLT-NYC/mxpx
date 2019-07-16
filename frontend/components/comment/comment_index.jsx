import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';
import defaultProfilePic from '../../../app/assets/images/default_profile_pic.png';

class CommentIndex extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            body: '',
            submitButtonActive: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelSubmit = this.cancelSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value,
            submitButtonActive: true
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let { pictureId, authorId } = this.props;
        let { body } =  this.state;
        
        let comment = { 
            commentable_type: 'Picture',
            commentable_id: pictureId, 
            author_id: authorId, 
            body 
        };

        debugger

        this.props.createPictureComment(comment);

        this.setState({
            body: '',
            submitButtonActive: false
        });        
    }

    cancelSubmit(e) {
        e.preventDefault();

        this.setState({
            body: '',
            submitButtonActive: false
        });
    }

    componentDidMount() {
        if (this.props.commentIds.length > 0) {
            this.props.fetchPictureComments(this.props.pictureId)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pictureId != this.props.pictureId) {
            this.props.fetchPictureComments(this.props.pictureId);
        }
    }

    render () {
        let submitButton;
        let cancelSubmitButton;
        let createCommentFormFieldClass;
        if (this.state.submitButtonActive) {
            if (this.state.body.length > 0) {
                submitButton = <input className='commentSubmitButton' type="submit" value='Comment'/>;
            } else {
                submitButton = <div className='commentSubmitButton-mock'>Comment</div>
            }
            cancelSubmitButton = <div className='commentCancelSubmitButton' onClick={this.cancelSubmit}>Cancel</div>
            createCommentFormFieldClass = 'createCommentForm-field-active';
        } else {
            createCommentFormFieldClass = 'createCommentForm-field-inactive';
        }

        let authorProfilePicImgUrl;
        if (this.props.authorProfilePicImgUrl) {
            authorProfilePicImgUrl = this.props.authorProfilePicImgUrl;
        } else {
            authorProfilePicImgUrl = defaultProfilePic;
        }

        let commentCount = this.props.comments.length;
        let comments = this.props.comments.map((comment, index) => {
            return (
                <CommentIndexItemContainer key={index} comment={comment}/>
            )
        })

        return (
            <div className='commentIndexContainer'>
                <div className='createCommentForm-top'>{commentCount} Comments</div>

                <form className='createCommentForm' onSubmit={this.handleSubmit}>
                    <div className='createCommentForm-mid'>
                        <img className='commentIndex-authorProfilePic' src={authorProfilePicImgUrl}/>
                        <div className={createCommentFormFieldClass}>
                            <textarea className='createFormTextArea'
                                type='text' 
                                placeholder='Add a comment'
                                value={this.state.body} 
                                onChange={this.update('body')}>
                            </textarea>

                            <div className='comment-icon'><i className="far fa-comment"></i></div>
                        </div>
                    </div>

                    <div className='createCommentForm-bottom'>
                        {cancelSubmitButton}
                        {submitButton}
                    </div>
                </form>

                <ul className='commentIndexItems'>
                    {comments}
                </ul>
            </div>
        );
    }
}

export default CommentIndex;