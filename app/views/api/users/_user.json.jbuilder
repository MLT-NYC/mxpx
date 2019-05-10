json.extract! user, :id, :name, :email
json.pictureIds user.pictures.ids
json.followerIds user.followers.ids
json.followeeIds user.followees.ids