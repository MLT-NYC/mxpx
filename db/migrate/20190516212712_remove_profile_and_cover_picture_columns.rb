class RemoveProfileAndCoverPictureColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :pictures, :cover
    remove_column :pictures, :profile

    add_column :pictures, :cover, :boolean, :default => false
    add_column :pictures, :profile, :boolean, :default => false
  end
end
