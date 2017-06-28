var Body = React.createClass({
	getInitialState () {
		return {posts: []};
	},
	
	componentDidMount () {
		$.ajax({
			method: "GET",
			url: "/posts",
		}).done((data) => {
			this.setState({ posts: data});
		});
	},
	
	handleSubmit (post) {
		var newState = this.state.posts.concat( post );
		this.setState({ posts: newState });
	},
	
	handleDelete (id) {
		$.ajax({ 
			url: '/posts', 
			type: 'DELETE', 
			data: {id: id}
		}).done((data) => { this.setState ({ posts: data }); });
	},  
	
	render () {
		return(
			<div>
				<NewPost handleSubmit = {this.handleSubmit}/>
				<br/>
				<AllPosts user = {this.props.user} posts = {this.state.posts} handleDelete = {this.handleDelete}/>
			</div>
		);
	}
});