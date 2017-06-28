class PostsController < ApplicationController
	def index
		posts = Post.all
		newPosts = []
		posts.each do |post|
			author_name = post.user.name
			newPosts.push({author: author_name, post: post})
		end
		respond_with newPosts
	end
	
	def create
		post = current_user.posts.build(post_params)
		if post.save
			redirect_to current_user
		end
	end
	
	def destroy
		Post.destroy(params[:id])
	end
	
	private 

		def post_params 
			params.require(:post).permit(:content) 
		end 
end
