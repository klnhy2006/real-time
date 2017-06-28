var NewPost = React.createClass({
	handleClick: function () {
		$.ajax({
			method: "POST",
			url: "/posts",
			data: { post: {content: this.refs.content.value}}
		}).done( (data) => {this.props.handleSubmit(data); });
	},
	
	render: function (){
		return (
			<div>
				<input ref='content' placeholder='Post something' /> 
				<button onClick = {this.handleClick} >Submit</button> 
			</div>
		);
	}
});