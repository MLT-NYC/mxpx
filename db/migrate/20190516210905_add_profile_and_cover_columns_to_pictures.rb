class AddProfileAndCoverColumnsToPictures < ActiveRecord::Migration[5.2]
  def change
    add_column :pictures, :profile, :boolean
    add_column :pictures, :cover, :boolean
  end
end
