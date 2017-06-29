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
	},
	
	handleSubmit (comment) {
		var newState = this.state.comments.concat( comment );
		this.setState({ comments: newState});
	},
	
	handleDelete (id) {
		$.ajax ({
			url: '/comments',
			type: 'DELETE',
			data: {id: id}
		}).done( (data) => {this.removeComment(id);} );
	},
	
	removeComment (id) {
		var newComments = this.state.comments.filter ((comment) => {
			return comment.comment.id != id;
		});
		this.setState({ comments: newComments });
	}, 
	
	render: function () {
		var deleteButton = (this.props.item.post.user_id === this.props.currentUser.id)? <button onClick = {this.props.handleDelete}>Delete</button>: null;
		return (
			<div>
				<span>Posted at {this.props.item.post.created_at} by {this.props.item.author}</span>
				<br/>
				<span>Content: {this.props.item.post.content}</span>
				{deleteButton}
				<NewComment handleSubmit = {this.handleSubmit} postId = {this.props.item.post.id} userId = {this.props.currentUser.id}/>
				<AllComments comments = {this.state.comments} handleDelete = {this.handleDelete} currentUser = {this.props.currentUser}/>
			</div>
		);
	}
});