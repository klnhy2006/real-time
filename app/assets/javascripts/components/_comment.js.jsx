var Comment = React.createClass({
	getInitialState: function () {
		return { 
			replies: [],
			clicked: false
		};
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
	
	handleLike (replyId) {
		App.replies.like_stuff(replyId);
	},
	
	addNewReply: function (reply) {
		if (reply.reply.comment_id == this.props.item.comment.id){
			var newReplies = this.state.replies.concat (reply);
			this.setState({ replies: newReplies });
		} 
	},
	
	removeReply: function (id) {
		var newReplies = this.state.replies.filter((reply) => {
			return reply.reply.id != id; 
		});
		this.setState({ replies: newReplies });
	},
	
	updateLike: function (id) {
		var newReplies = [];
		this.state.replies.forEach((reply) => {
			if (reply.reply.id === id) {
				reply.reply.like = !reply.reply.like;
			}
			newReplies.push(reply);
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
					case "like_stuff":
						component.updateLike (data['message']);
						break;
					default:
						break;
				}
			},
			post_new_stuff: function (data) {
				return this.perform('post_new_stuff', {new_post: data});
			},
			delete_stuff: function (replyId) {
				return this.perform('delete_stuff', {delete_id: replyId});
			},
			like_stuff: function (replyId) {
				return this.perform('like_stuff', {like_id: replyId});
			}
		});	
	},
	
	repClicked: function () {
		this.setState({ clicked: true });
	},
	
	render: function () {
		var deleteButton = (this.props.item.comment.user_id === this.props.currentUser.id )? <button onClick = {this.props.handleDelete}>Delete Comment</button> : null; 
		var likeButton = ( this.props.item.comment.like === true ) ? "Dislike Comment" : "Like Comment";
		var replyButton = ( this.state.clicked ) ? <NewReply handleSubmit = {this.handleSubmit} userId = {this.props.currentUser.id} commentId = {this.props.item.comment.id}/>: <button onClick = {this.repClicked}>Reply</button>
		return (
			<div className = "comment">
				<p>
					<span>Comment posted at {this.props.item.comment.created_at} by {this.props.item.author}</span>
					{this.props.item.comment.content}
				</p> 
				{deleteButton}<button onClick = {this.props.handleLike}>{likeButton}</button>
				<AllReplies replies = {this.state.replies} handleDelete = {this.handleDelete} currentUser = {this.props.currentUser} 
					handleLike = {this.handleLike}/>
				{replyButton}
			</div>
		);
	}
});

