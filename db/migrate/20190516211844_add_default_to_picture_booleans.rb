class AddDefaultToPictureBooleans < ActiveRecord::Migration[5.2]
  def change
    change_column_default :pictures, :profile, false
    change_column_default :pictures, :cover, false
  end
end
