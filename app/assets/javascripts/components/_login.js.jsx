var LogIn = React.createClass ({
	handleSubmit () {
		$.ajax({
			method: 'POST',
			url: '/sessions',
			data: {name: this.refs.user_name.value, password: this.refs.password.value}
		});
	},
	
	render: function () {
		return (
				<div>
					<input className = 'form-control' type='text' ref='user_name' placeholder='Enter user name'/>
					<input className = 'form-control' type='password' ref='password' placeholder='Enter password'/>
					<button className = 'btn btn-primary' onClick={this.handleSubmit}>LogIn</button>
				</div>
		);
	}
});