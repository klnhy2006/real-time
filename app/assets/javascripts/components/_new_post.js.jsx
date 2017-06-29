var NewPost = React.createClass({
	handleClick: function () {
		var response = { post: {content: this.refs.content.value}, author: this.props.currentUser.id};
		this.props.handleSubmit(response); 
	},
	
	render: function (){
		return (
			<div>
				<input ref='content' placeholder='Post something' /> 
				<button onClick = {this.handleClick} >Post</button> 
			</div>
		);
	}
});