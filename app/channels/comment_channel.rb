class CommentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "comment"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	post = Post.find(data['new_post']['postId'])
	comment_params = {content: data['new_post']['comment']['content'], user_id: data['new_post']['comment']['user_id']}
	comment = post.comments.build(comment_params)
	if comment.save
		author = data['new_post']['author']
		ActionCable.server.broadcast "comment", {message: {author: author, comment: comment}, type: 'post_new_stuff'}
	else
		puts "not saved"
	end
  end
  
  def delete_stuff (data)
	Comment.destroy(data['delete_id'])
	ActionCable.server.broadcast "comment", {message: data['delete_id'], type: 'delete_stuff'}
  end
end
