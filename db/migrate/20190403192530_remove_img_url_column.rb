class RemoveImgUrlColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :pictures, :img_url
  end
end
