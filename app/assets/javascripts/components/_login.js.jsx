var LogIn = React.createClass ({
	handleSubmit () {
		alert('handle submit');
		$.ajax({
			method: 'POST',
			url: '/sessions',
			data: {name: this.refs.user_name.value, password: this.refs.password.value}
		}).done(() => {alert('haha');});
	},
	
	render: function () {
		return (
			<div>
				<input type='text' ref='user_name' placeholder='Enter user name'/>
				<input type='password' ref='password' placeholder='Enter password'/>
				<button onClick={this.handleSubmit}>LogIn</button>
			</div>
		);
	}
});