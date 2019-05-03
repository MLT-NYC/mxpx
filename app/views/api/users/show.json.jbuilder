json.extract! @user, :id, :name, :email
json.pictureIds @user.pictures.ids
json.followerIds @user.followers
json.followeeIds @user.followees