var AllPosts = React.createClass ({
	handleDelete(id) {
		this.props.handleDelete(id);
	},
	
	render: function () {
		var posts = this.props.posts.map ((post) => {
			return (
				<div key = {post.id}>
					<Post item = {post} currentUser = {this.props.user}
						handleDelete = {this.handleDelete.bind(this, post.id)} />
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