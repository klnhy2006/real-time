class PostChannel < ApplicationCable::Channel
  def subscribed
    stream_from "post"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def post_new_stuff (data)
	post_params = data['new_post']['post']
	currentUser = User.find(data['new_post']['author'])
	post = currentUser.posts.build(post_params)
		if post.save
			puts post.picture
			ActionCable.server.broadcast "post", {message: {author: currentUser.name, post: post}, type: 'post_new_stuff'} 
		end
  end
  
  def delete_stuff (data)
	Post.destroy(data['delete_id'])
	ActionCable.server.broadcast "post", {message: data['delete_id'], type: 'delete_stuff'}
  end
  
  def like_stuff (data)
	post = Post.find(data['like_id'])
	post.like = !post.like 
	if post.save
		ActionCable.server.broadcast "post", {message: data['like_id'], type: 'like_stuff'}
	end
  end
end
