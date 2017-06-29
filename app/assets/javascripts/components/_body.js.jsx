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
	
	addNewPost (post) {
		var newState = this.state.posts.concat( post );
		this.setState({ posts: newState });
	},
	
	handleDelete (id) {
		$.ajax({ 
			url: '/posts', 
			type: 'DELETE', 
			data: {id: id}
		}).done((data) => { this.setState ({ posts: data }); });
	},  
	
	setupSubscription () {
		var component = this;
		App.posts = App.cable.subscriptions.create("PostChannel", {
			received: function (data) {
				alert(data['message'].post.id);
				component.addNewPost(data['message']);
			},
			post_new_stuff: function (data) {
				alert("in post_new_stuff:" + data.post.content );
				return this.perform('post_new_stuff', {new_post: data});
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