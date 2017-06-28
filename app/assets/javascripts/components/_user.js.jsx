var User = React.createClass({
	handleClick: function () {
		$.ajax({
			method: 'DELETE',
			url: '/logout'
		});
	},
	
	render: function () {
		return (
			<div>
				{this.props.user.name}
				<br/>
				<button onClick = {this.handleClick}>Log Out</button>
				<br/>
				<Body user = {this.props.user}/>
			</div>
		);
	}
});