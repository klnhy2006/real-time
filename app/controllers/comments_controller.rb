class CommentsController < ApplicationController
	def index
		return render json: add_author_to_comment(params[:postId])
	end
	
	def create
		# post = Post.find(params[:postId])
		# comment = post.comments.build(comment_params)
		# if comment.save
			# return render json: {author: current_user.name, comment: comment}
		# end
	end
	
	def destroy
		# Comment.destroy(params[:id])
		# return render json: {status: :ok}
	end
	
	private
		# def comment_params 
			# params.require(:comment).permit(:content, :user_id) 
		# end 
		
		def add_author_to_comment (postId)
			post = Post.find(postId)
			comments = []
			post.comments.each do |comment|
				author = User.find(comment.user_id).name
				comments.push({author: author, comment: comment})
			end
			return comments
		end
end
