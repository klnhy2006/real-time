var Comment = React.createClass({
	render: function () {
		var deleteButton = (this.props.item.comment.user_id === this.props.currentUser.id )? <button onClick = {this.props.handleDelete}>Delete Comment</button> : null; 
		return (
			<div>
				<span>Comment posted at {this.props.item.comment.created_at} by {this.props.item.author}</span>
				<br/>
				<span>Comment: {this.props.item.comment.content}</span>
				{deleteButton}	
			</div>
		);
	}
});

