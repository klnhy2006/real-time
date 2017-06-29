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
		this.setupSubscription();
	},
	
	handleSubmit (reply) {
		App.replies.post_new_stuff(reply);
	},
	
	handleDelete (replyId) {
		App.replies.delete_stuff(replyId);
	},
	
	addNewReply: function (reply) {
		var newReplies = this.state.replies.concat (reply);
		this.setState({ replies: newReplies });
	},
	
	removeReply: function (id) {
		var newReplies = this.state.replies.filter((reply) => {
			return reply.reply.id != id; 
		});
		this.setState({ replies: newReplies });
	},
	
	setupSubscription: function () {
		var component = this;
		App.replies = App.cable.subscriptions.create("ReplyChannel", {
			received: function (data) {
				switch (data.type) {
					case "post_new_stuff":
						component.addNewReply(data['message']);
						break;
					case "delete_stuff":
						component.removeReply (data['message']);
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

