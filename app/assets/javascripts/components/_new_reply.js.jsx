var NewReply = React.createClass ({
	handleClick () {
		var response = {reply: { content: this.refs.content.value, user_id: this.props.userId }, commentId : this.props.commentId};
		this.props.handleSubmit( response );
	},
	render: function () {
		return (
			<div>
				<input ref='content' placeholder='Reply' /> 
				<button onClick = {this.handleClick} >Reply</button> 
			</div>
		);
	}
});