var Comment = React.createClass({
	getInitialState: function () {
		return { replies: [] };
	},
	
	componentDidMount: function () {
		$.ajax({
			method: 'GET',
			url: '/replies',
			data: {commentId: this.props.item.comment.id}
		}).done((data) => {
			this.setState({ replies: data});
		});
	},
	
	handleSubmit: function (reply) {
		var newReplies = this.state.replies.concat (reply);
		this.setState({ replies: newReplies });
	},
	
	handleDelete: function (id) {
		$.ajax({
			method: 'DELETE',
			url: '/replies',
			data: {id: id}
		}).done (() => {
			this.removeReply(id);
		});
	},
	
	removeReply: function (id) {
		var newReplies = this.state.replies.filter((reply) => {
			return reply.reply.id != id; 
		});
		this.setState({ replies: newReplies });
	},
	
	render: function () {
		var deleteButton = (this.props.item.comment.user_id === this.props.currentUser.id )? <button onClick = {this.props.handleDelete}>Delete Comment</button> : null; 
		return (
			<div>
				<span>Comment posted at {this.props.item.comment.created_at} by {this.props.item.author}</span>
				<br/>
				<span>Comment: {this.props.item.comment.content}</span>
				{deleteButton}	
				<NewReply handleSubmit = {this.handleSubmit} userId = {this.props.currentUser.id} commentId = {this.props.item.comment.id}/>
				<AllReplies replies = {this.state.replies} handleDelete = {this.handleDelete} currentUser = {this.props.currentUser} />
			</div>
		);
	}
});

