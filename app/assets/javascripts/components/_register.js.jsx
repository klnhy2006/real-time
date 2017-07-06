var Register = React.createClass ({
	handleSubmit () {
		alert("submit");
		var name = this.refs.user_name.value;
		var password = this.refs.password.value;
		$.ajax({
			method: 'POST',
			url: '/users',
			data: { user:{ name: name, password: password} },
		}); 
	},
	//for some reason, specifying dataType will not show the page??????????
		
	render: function () {
		return (
				<div>
					<input className = 'form-control' type='text' ref='user_name' placeholder='Enter user name'/>
					<input className = 'form-control' type='password' ref='password' placeholder='Enter password'/>
					<button className = 'btn btn-primary' onClick={this.handleSubmit}>Register</button>
				</div>
		);
	}
});
