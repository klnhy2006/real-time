var NewReply = React.createClass ({
	handleClick () {
		alert('first');
		$.ajax({ 
			url: '/replies', 
			type: 'POST', 
			data: { reply: { content: this.refs.content.value, user_id: this.props.userId }, commentId : this.props.commentId } 
		}).done((response) => 
				{ alert(response); this.props.handleSubmit( response ); } );
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