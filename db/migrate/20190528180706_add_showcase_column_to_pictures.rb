class AddShowcaseColumnToPictures < ActiveRecord::Migration[5.2]
  def change
    add_column :pictures, :showcase, :boolean, :default => true
  end
end
