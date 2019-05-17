json.extract! @user, :id, :email, :first_name, :last_name, :about, :city, :country, :profile_picture_id, :cover_picture_id
json.pictureIds @user.pictures.ids
json.followerIds @user.followers.ids
json.followeeIds @user.followees.ids