json.extract! @picture, :id, :photographer_id, :title, :description, :profile, :cover, :showcase
json.img_url url_for(@picture.image) if @picture.image.attached?
json.commentIds @picture.comments.ids.reverse
json.likerIds @picture.likers.ids
