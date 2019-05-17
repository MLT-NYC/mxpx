class AddProfileAndCoverPictureColumnsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :profile_picture_id, :integer
    add_column :users, :cover_picture_id, :integer
  end
end
