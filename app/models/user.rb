class User < ApplicationRecord
	has_secure_password
	has_many :posts, dependent: :destroy
	has_many :comments
	has_many :replies
	validates :name, presence: true, uniqueness: true
	validates :password, presence: true
end
