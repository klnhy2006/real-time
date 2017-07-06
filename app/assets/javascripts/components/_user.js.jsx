var User = React.createClass({
	getInitialState: function () {
		return {
			selectedPost : []
		};
	},
	
	handleClick: function () {
		$.ajax({
			method: 'DELETE',
			url: '/logout'
		});
	},
	
	showSelectedPost: function (result) {
		var temp = [];
		temp.push (result);
		alert("show selected post content:" + result.to_json);
		this.setState({ selectedPost: temp });
	},
	
	render: function () {
		return (
			<div className="row">
				<aside className="col-md-4">
					<h1>Welcome {this.props.user.name}!</h1> 
					<section>
						<SearchBar showSelectedPost = {this.showSelectedPost}/>
					</section>
				</aside>
				<div className="col-md-7">
					<Body user = {this.props.user} selectedPost = {this.state.selectedPost}/>
				</div>
				<div className="col-md-1">
					<button onClick = {this.handleClick}>Log Out</button>
				</div>
			</div>
		);
	}
});