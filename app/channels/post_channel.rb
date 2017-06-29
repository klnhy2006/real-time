class PostChannel < ApplicationCable::Channel
  def subscribed
	puts "subssssss"
    stream_from "post"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	puts "in possssssst"
	ActionCable.server.broadcast "post", message: data['new_post']
  end
end
