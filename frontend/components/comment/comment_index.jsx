import React from 'react';

class CommentIndex extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            body: '',
            picture_id: props.pictureId,
            author_id: props.authorId,
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

        let { picture_id, author_id, body } = this.state;
        let comment = { picture_id, author_id, body };

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
        this.props.fetchPictureComments(this.state.picture_id);
    }

    render () {
        let defaultValue;
        let submitButton;
        let cancelSubmitButton;
        if (this.state.submitButtonActive) {
            defaultValue = this.state.body;
            submitButton = <input className='commentSubmitButton' type="submit" />;
            cancelSubmitButton = <div className='commentCancelSubmitButton' onClick={this.cancelSubmit}>Cancel</div>
        } else {
            defaultValue = 'Add a comment';
        }

        return (
            <div className='test'>
                
                <form className='createCommentForm' onSubmit={this.handleSubmit}>
                    <textarea className='createCommentField' 
                        type='text' 
                        value={defaultValue} 
                        onChange={this.update('body')}>
                    </textarea>

                    {cancelSubmitButton}
                    {submitButton}
                </form>

            </div>
        );
    }
}

export default CommentIndex;