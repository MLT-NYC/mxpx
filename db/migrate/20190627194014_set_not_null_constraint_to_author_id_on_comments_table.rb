class SetNotNullConstraintToAuthorIdOnCommentsTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :comments, :author_id, false
  end
end
