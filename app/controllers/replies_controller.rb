class RepliesController < ApplicationController
	def index
		return render json: add_author_for_replies(params[:commentId])
	end
	
	# def create
		# comment = Comment.find(params[:commentId])
		# reply = comment.replies.build(reply_params)
		# if reply.save
			# return render json: {reply: reply, author: current_user.name}
		# end
	# end
	
	# def destroy
		# Reply.destroy(params[:id])
		# return render json: {status: :ok}
	# end
	
	private
		# def reply_params
			# params.require(:reply).permit(:content, :user_id) 
		# end
		
		def add_author_for_replies(commentId)
			comment = Comment.find(commentId)
			replies = []
			comment.replies.each do |reply|
				author = User.find(reply.user_id).name
				replies.push({ author: author, reply: reply})
			end
			return replies
		end
end
