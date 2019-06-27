json.array! @comments do |comment|
    json.extract! @comment, :id, :commentable_id, :commentable_type
end