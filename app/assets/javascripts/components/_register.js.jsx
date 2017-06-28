var Register = React.createClass ({
	handleSubmit () {
		alert("submit");
		var name = this.refs.user_name.value;
		var password = this.refs.password.value;
		$.ajax({
			method: 'POST',
			url: '/users',
			data: { user:{ name: name, password: password} },
		}).done(()=>{alert("done");}); 
	},
	//for some reason, specifying dataType will not show the page??????????
		
	render: function () {
		return (
			<div>
				<input type='text' ref='user_name' placeholder='Enter user name'/><br/>
				<input type='password' ref='password' placeholder='Enter password'/><br/>
				
				<button onClick={this.handleSubmit}>Register</button>
			</div>
		);
	}
});

//<input type='password' ref='password_confirmation' placeholder='Confirm password'/>