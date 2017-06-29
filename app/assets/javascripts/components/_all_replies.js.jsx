var AllReplies = React.createClass({
	handleDelete: function (id) {
		this.props.handleDelete(id);
	},
	
	render: function () {
		var replies = this.props.replies.map ((reply) => {
			return (
				<div key = {reply.reply.id} >
					<Reply item = {reply} currentUser = {this.props.currentUser}
						handleDelete = {this.handleDelete.bind(this, reply.reply.id)} />
				</div>
			);
		});
		
		return (
			<div>
				{replies}
			</div>
		);
	}
});