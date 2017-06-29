var NewComment = React.createClass({
	handleClick() { 
		var response = {comment: { content: this.refs.content.value, user_id: this.props.currentUser.id, like: false }, postId: this.props.postId}
		this.props.handleSubmit(response);
	},
	
	render: function () {
		return (
			<div>
				<input ref='content' placeholder='Comment' /> 
				<button onClick = {this.handleClick} >Comment</button> 
			</div>
		);
	}
});