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
			url: '/posts/'+ id, 
			type: 'DELETE', 
		}).done(() => { this.removePost(id); });
	}, 
	
	removePost (id) {
		var newPosts = this.state.posts.filter((post) => {
			return post.id != id;
		});
		this.setState({ posts: newPosts});
	}, 
	
	render () {
		return(
			<div>
				<NewPost user = {this.props.user} handleSubmit = {this.handleSubmit}/>
				<br/>
				<AllPosts user = {this.props.user} posts = {this.state.posts} handleDelete = {this.handleDelete}/>
			</div>
		);
	}
});