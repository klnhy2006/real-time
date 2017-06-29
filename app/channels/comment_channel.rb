class CommentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "comment"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	post = Post.find(data['new_post']['postId'])
	comment_params = data['new_post']['comment']
	comment = post.comments.build(comment_params)
	if comment.save
		author = User.find(data['new_post']['comment']['user_id']).name
		ActionCable.server.broadcast "comment", {message: {author: author, comment: comment}, type: 'post_new_stuff'}
	else
		puts "not saved"
	end
  end
  
  def delete_stuff (data)
	Comment.destroy(data['delete_id'])
	ActionCable.server.broadcast "comment", {message: data['delete_id'], type: 'delete_stuff'}
  end
  
  def like_stuff (data)
	comment = Comment.find(data['like_id'])
	comment.like = !comment.like
	if comment.save
		puts 'success'
		ActionCable.server.broadcast "comment", {message: data['like_id'], type: 'like_stuff'}
	end
  end
end
