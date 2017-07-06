var NewComment = React.createClass({
	getInitialState: function () {
		return { textField: "" };
	},
	
	handleChange: function (e) {
		e.preventDefault();
		this.setState({ textField: e.target.value});
	},
	
	handleClick() { 
		var response = {comment: { content: this.refs.content.value, user_id: this.props.currentUser.id, like: false }, postId: this.props.postId}
		this.props.handleSubmit(response);
		this.setState({ textField: ""});
	},
	
	render: function () {
		return (
			<div className = "new-comment">
				<input className = "form-control" ref='content' placeholder='Comment' value = {this.state.textField}
					onChange = {this.handleChange}/> 
				<button onClick = {this.handleClick} className = "btn btn-primary">Comment</button> 
			</div>
		);
	}
});