var SearchBar = React.createClass({
	getInitialState: function () {
		return {
			searchText: "",
			searchResults: [],
			selectedIndex: -1
		};
	},
	
	handleChange: function (e) {
		e.preventDefault();
		this.setState({ searchText: e.target.value });
		$.ajax({
			method: "GET",
			url: "/search_posts",
			data: {searchText : e.target.value}
		}).done((results) => {
			this.setState({searchResults: results});
		});
		
		 //clear everything when starting another search
		if(this.state.selectedIndex !== -1)
			this.setState({selectedIndex: -1}); 
	},
	
	 //for selecting a post from results
	handleClick: function (e) {
		e.preventDefault();
		this.setState({ selectedIndex: e.target.name, searchResults:[], searchText:""});
		$.ajax({
			method: "GET",
			url: "/post",
			data: {postId: e.target.name}
		}).done((result) => {
			alert("ajax result:" + result.to_json);
			this.props.showSelectedPost(result);
		});
		
	}, 
	clearResults: function () {
		this.setState ({searchResults:[],searchText:""});
	},
	
	render: function () {
		var resultBox = [];
		this.state.searchResults.forEach((result) => {
			resultBox.push(
							<div key = {result.id}>
								<button className = "Search-Result" name = {result.id}
									onMouseDown = {this.handleClick}>
								{result.content}
								</button>
							</div>
			);
		});
		
		return (
			<div>
				Search for Posts: 
				<input className = "Search-Result form-control" type="text" placeholder="search posts" 
				onChange={this.handleChange} value={this.state.searchText}
				onBlur={this.clearResults}/>
				{resultBox}
			</div>
		);
	}
});
