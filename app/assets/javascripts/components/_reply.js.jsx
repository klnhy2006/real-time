var Reply = React.createClass({
	render: function () {
		var deleteButton = (this.props.currentUser.id === this.props.item.reply.user_id)? <button onClick = {this.props.handleDelete}>Delete</button> : null;
		var likeButton = (this.props.item.reply.like === true) ? "Dislike Reply" : "Like Reply";
		return (
			<div>
				<span>Reply posted at {this.props.item.reply.created_at} by {this.props.item.author}</span>
				<br/>
				<span>Reply: {this.props.item.reply.content}</span>
				{deleteButton}
				<button onClick = {this.props.handleLike}>{likeButton}</button>
			</div>
		);
	}
});