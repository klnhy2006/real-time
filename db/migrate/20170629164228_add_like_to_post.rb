class AddLikeToPost < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :like, :boolean
  end
end
