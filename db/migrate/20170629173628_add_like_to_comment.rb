class AddLikeToComment < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :like, :boolean
  end
end
