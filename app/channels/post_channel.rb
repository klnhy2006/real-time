class PostChannel < ApplicationCable::Channel
  def subscribed
    stream_from "post"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	ActionCable.server.broadcast "post", {message: data['new_post'], type: 'post_new_stuff'}
  end
  
  def delete_stuff (data)
	Post.destroy(data['delete_id'])
	ActionCable.server.broadcast "post", {message: data['delete_id'], type: 'delete_stuff'}
  end
end
