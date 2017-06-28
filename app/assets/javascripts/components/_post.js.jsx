var Post = React.createClass({
	render: function () {
		var deleteButton = (this.props.item.post.user_id === this.props.currentUser.id)? <button onClick = {this.props.handleDelete}>Delete</button>: null;
		return (
			<div key = {this.props.item.post.id}>
				<span>Posted at {this.props.item.post.created_at} by {this.props.item.author}</span>
				<br/>
				<span>Content: {this.props.item.post.content}</span>
				{deleteButton}
			</div>
		);
	}
});