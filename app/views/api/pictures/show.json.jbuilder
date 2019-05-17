json.extract! @picture, :id, :photographer_id, :title, :description, :profile, :cover
json.img_url url_for(@picture.image) if @picture.image.attached?
