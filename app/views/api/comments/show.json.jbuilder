json.extract! @comment, :id, :body, :commentable_id, :commentable_type
json.subCommentIds @comment.comments.ids if @comment.commentable_type == 'Picture'
json.authorId @comment.author.id
json.createdDate @comment.created_at