var NewPost = React.createClass({
	getInitialState: function () {
		return { textField: "" };
	},
	
	handleClick: function () {
		alert("img: "+ this.refs.img.value);
		var response = { post: {content: this.refs.content.value, like: false, picture: this.refs.img.value }, author: this.props.currentUser.id};
		alert(response.post.picture);
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
				<input type = "file" ref = "img" />
				<button onClick = {this.handleClick} className ="btn btn-primary" >Post</button> 
			</div>
		);
	}
});