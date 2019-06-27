class UpdateCommentsForPolymorphism < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :author_id
    remove_column :comments, :picture_id

    add_column :comments, :commentable_id, :integer
    add_column :comments, :commentable_type, :string
  end
end
