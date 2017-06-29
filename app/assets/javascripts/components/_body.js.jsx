var Body = React.createClass({
	getInitialState () {
		return {posts: []};
	},
	
	componentDidMount () {
		$.ajax({
			method: "GET",
			url: "/posts",
		}).done((data) => {
			this.setState({ posts: data});
		});
		this.setupSubscription();
	},
	
	handleSubmit (post) {
		App.posts.post_new_stuff(post);
	},
	
	handleDelete (postId) {
		App.posts.delete_stuff(postId);
	},
	
	addNewPost (post) {
		var newState = this.state.posts.concat( post );
		this.setState({ posts: newState });
	},
	
	removePost: function (id) {
		var newPosts = this.state.posts.filter((post) => {
			return post.post.id != id;
		});
		this.setState({ posts: newPosts });
	},
	
	setupSubscription () {
		var component = this;
		App.posts = App.cable.subscriptions.create("PostChannel", {
			received: function (data) {
				switch (data.type) {
					case "post_new_stuff":
						component.addNewPost(data['message']);
						break;
					case "delete_stuff":
						component.removePost (data['message']);
						break;
					default:
						break;
				}
			},
			post_new_stuff: function (data) {
				return this.perform('post_new_stuff', {new_post: data});
			},
			delete_stuff: function (postId) {
				return this.perform('delete_stuff', {delete_id: postId});
			}
		});	
	},
	
	render () {
		return(
			<div>
				<NewPost handleSubmit = {this.handleSubmit}/>
				<br/>
				<AllPosts user = {this.props.user} posts = {this.state.posts} handleDelete = {this.handleDelete}/>
			</div>
		);
	}
});