class PostsController < ApplicationController
	def index
		return render json: add_author_to_posts(Post.all)
	end
	
	# def create
		# post = current_user.posts.build(post_params)
		# if post.save
			# return render json: {author: current_user.name, post: post} 
		# end
	# end
	
	# def destroy
		# Post.destroy(params[:id])
		# return render json: add_author_to_all_posts
	# end
	
	def show
		data = add_author_to_posts(Post.find(params[:postId]))
		return render json: data.first
	end
	
	def search_posts
		results = []
		Post.all.each do |post|
			if post.content.index(params[:searchText]) 
					results.push({content: post.content, id: post.id})
			end
		end
		return render json: results
	end
	
	private 

		# def post_params 
			# params.require(:post).permit(:content) 
		# end 
		
		def add_author_to_posts (posts)
			newPosts = []
			Array(posts).each do |post|
				author_name = post.user.name
				newPosts.push({author: author_name, post: post})
			end
			return newPosts
		end
end
