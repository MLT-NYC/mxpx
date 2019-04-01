class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.integer :photographer_id, null: false
      t.string :img_url, null: false
      t.string :title, null: false
      t.string :description, null: false

      t.timestamps
    end
    add_index :pictures, :photographer_id
  end
end
