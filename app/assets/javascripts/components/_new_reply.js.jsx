var NewReply = React.createClass ({
	getInitialState: function () {
		return { textField: "" };
	},
	
	handleChange: function (e) {
		e.preventDefault();
		this.setState({ textField: e.target.value});
	},
	
	handleClick () {
		var response = {reply: { content: this.refs.content.value, user_id: this.props.userId, like: false }, commentId : this.props.commentId};
		this.props.handleSubmit( response );
		this.setState({ textField: ""});
	},
	render: function () {
		return (
			<div className = "new-reply">
				<input className = "form-control" ref='content' placeholder='Reply' value = {this.state.textField}
					onChange = {this.handleChange} /> 
				<button onClick = {this.handleClick} className = "btn btn-primary">Reply</button> 
			</div>
		);
	}
});