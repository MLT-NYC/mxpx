json.extract! @user, :id, :email, :first_name, :last_name, :about, :city, :country
json.pictureIds @user.pictures.ids
json.followerIds @user.followers.ids
json.followeeIds @user.followees.ids