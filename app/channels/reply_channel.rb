class ReplyChannel < ApplicationCable::Channel
  def subscribed
    stream_from "reply"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	current_user = User.find(data['new_post']['reply']['user_id'])
	comment = Comment.find(data['new_post']['commentId'])
	reply_params = data['new_post']['reply']
	puts reply_params
	reply = comment.replies.build(reply_params)
	if reply.save
		puts "success"
		ActionCable.server.broadcast "reply", {message: {reply: reply, author: current_user.name}, type: 'post_new_stuff'}
	end
  end
  
  def delete_stuff (data)
	Reply.destroy(data['delete_id'])
	ActionCable.server.broadcast "reply", {message: data['delete_id'], type: 'delete_stuff'}
  end
end
