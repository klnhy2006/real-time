var AllComments = React.createClass({
	handleDelete (id) {
		this.props.handleDelete(id);
	},
	
	render: function () {
		var comments = this.props.comments.map((comment) => {
			return (
				<div key = {comment.comment.id}>
					<Comment item= {comment} currentUser = {this.props.currentUser}
						handleDelete = {this.handleDelete.bind(this, comment.comment.id)}/>
				</div>
			);
		});
		
		return (
			<div>
				{comments}
			</div>
		);
	}
});