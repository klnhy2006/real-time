var Post = React.createClass({
	 getInitialState() {
        return { 
			comments: []
		}
    },
	
	componentDidMount () {
		$.ajax({
			method: "GET",
			url: "/comments",
			data: {postId: this.props.item.post.id}
		}).done( (data) => {
			this.setState({ comments: data}) });
			this.setupSubscription();
	},
	
	handleSubmit (comment) {
		App.comments.post_new_stuff(comment);
	},

	handleDelete (commentId) {
		App.comments.delete_stuff(commentId);
	},
	
	removeComment (id) {
		var newComments = this.state.comments.filter ((comment) => {
			return comment.comment.id != id;
		});
		this.setState({ comments: newComments });
	}, 
	
	addNewComment (comment) {
		if (comment.comment.post_id == this.props.item.post.id) {
			var newState = this.state.comments.concat( comment );
			this.setState({ comments: newState });
		}
	},
	
	setupSubscription () {
		var component = this;
		App.comments = App.cable.subscriptions.create("CommentChannel", {
			received: function (data) {
				switch (data.type) {
					case "post_new_stuff":
						component.addNewComment(data['message']);
						break;
					case "delete_stuff":
						component.removeComment (data['message']);
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
		var deleteButton = (this.props.item.post.user_id === this.props.currentUser.id)? <button onClick = {this.props.handleDelete}>Delete</button>: null;
		return (
			<div>
				<span>Posted at {this.props.item.post.created_at} by {this.props.item.author}</span>
				<br/>
				<span>Content: {this.props.item.post.content}</span>
				{deleteButton}
				<NewComment handleSubmit = {this.handleSubmit} postId = {this.props.item.post.id} currentUser = {this.props.currentUser}/>
				<AllComments comments = {this.state.comments} handleDelete = {this.handleDelete} currentUser = {this.props.currentUser}/>
			</div>
		);
	}
});