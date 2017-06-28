var NewComment = React.createClass({
	handleClick() { 
		$.ajax({ 
			url: '/comments', 
			type: 'POST', 
			data: { comment: { content: this.refs.content.value, user_id: this.props.userId }, postId: this.props.postId }, 
			success: (response) => 
				{ this.props.handleSubmit( response ); } 
		});
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