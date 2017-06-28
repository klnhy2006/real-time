var AllPosts = React.createClass ({
	handleDelete(id) {
		this.props.handleDelete(id);
	},
	
	render: function () {
		var posts = this.props.posts.map ((post) => {
			return (
				<div >
					<Post item = {post} currentUser = {this.props.user}
						handleDelete = {this.handleDelete.bind(this, post.post.id)} />
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