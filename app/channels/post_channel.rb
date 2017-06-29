class PostChannel < ApplicationCable::Channel
  def subscribed
    stream_from "post"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	post_params = {content: data['new_post']['post']['content']}
	currentUser = User.find(data['new_post']['author'])
	post = currentUser.posts.build(post_params)
		if post.save
			ActionCable.server.broadcast "post", {message: {author: currentUser.name, post: post}, type: 'post_new_stuff'} 
		end
  end
  
  def delete_stuff (data)
	Post.destroy(data['delete_id'])
	ActionCable.server.broadcast "post", {message: data['delete_id'], type: 'delete_stuff'}
  end
end
