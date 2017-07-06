var NewPost = React.createClass({
	getInitialState: function () {
		return { textField: "" };
	},
	
	handleClick: function () {
		var response = { post: {content: this.refs.content.value, like: false}, author: this.props.currentUser.id};
		this.props.handleSubmit(response); 
		this.setState({ textField: ""});
	},
	
	handleChange: function (e) {
		e.preventDefault();
		this.setState({ textField: e.target.value});
	},
	
	render: function (){
		return (
			<div className = "new-post">
				<textarea className = "form-control" ref ='content' placeholder ='Post something' value = {this.state.textField}
					onChange = {this.handleChange}/> 
				<button onClick = {this.handleClick} className ="btn btn-primary" >Post</button> 
			</div>
		);
	}
});