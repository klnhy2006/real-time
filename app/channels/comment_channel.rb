class CommentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "comment"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	ActionCable.server.broadcast "comment", {message: data['new_post'], type: 'post_new_stuff'}
  end
  
  def delete_stuff (data)
	Comment.destroy(data['delete_id'])
	ActionCable.server.broadcast "comment", {message: data['delete_id'], type: 'delete_stuff'}
  end
end
