json.extract! @comment, :id, :commentable_id, :commentable_type
json.subCommentIds @comment.comments.ids