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
				<button onClick = {this.handleClick}>Log Out</button>
			</div>
		);
	}
});