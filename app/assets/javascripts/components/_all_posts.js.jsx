var AllPosts = React.createClass ({
	handleDelete (id) {
		this.props.handleDelete(id);
	},
	
	handleLike (id) {
		this.props.handleLike(id);
	},
	
	render: function () {
		var posts = this.props.posts.map ((post) => {
			return (
				<div key = {post.post.id}>
					<Post item = {post} currentUser = {this.props.user}
						handleDelete = {this.handleDelete.bind(this, post.post.id)}
						handleLike = {this.handleLike.bind(this, post.post.id)}/>
					<br/>
				</div>
			);
		});
		
		return (
			<div>
				{posts}
			</div>
		);
	}
});