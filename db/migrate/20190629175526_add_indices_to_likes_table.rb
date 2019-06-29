class AddIndicesToLikesTable < ActiveRecord::Migration[5.2]
  def change
    add_index(:likes, [:liker_id, :picture_id], unique: true)
  end
end
