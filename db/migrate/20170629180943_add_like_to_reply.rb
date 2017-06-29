class AddLikeToReply < ActiveRecord::Migration[5.1]
  def change
    add_column :replies, :like, :boolean
  end
end
