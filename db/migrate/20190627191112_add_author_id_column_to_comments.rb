class AddAuthorIdColumnToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :author_id, :integer
  end
end
