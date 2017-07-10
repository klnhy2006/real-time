class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  validates :content, presence: true
  #default_scope -> { order(created_at: :desc) }
  mount_uploader :picture, PictureUploader
end
