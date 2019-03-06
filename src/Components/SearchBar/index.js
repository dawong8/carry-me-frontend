import React, {Component} from 'react'; 

class SearchBar extends Component {
	constructor() {
		super(); 
		this.state = {
			search: '',
			platform: 'PC',  // Pc is the default
			searchResults: [],
		}
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault(); 

		this.fetchResults();

	}


	fetchResults = async () => {
		try {
			const response = await fetch(`https://www.apexlegendshut.com/free-api?platform=${this.state.platform}&title=${this.state.search}`);
			// const response = await fetch("https://www.apexlegendshut.com/free-api?character=Bangalore");
			if (!response.ok) {
	          throw Error(response.statusText);
	        }

	        const responseParsed = await response.json();

	        this.setState({
	        	searchResults: responseParsed.results
	        })
		} catch (err) {
			return err; 
		}
	}

	render() {
		console.log(this.state)
		return (
			<div>

				<form onSubmit={this.handleSubmit}>
					Username
					<input type="text" name="search" value={this.state.search} onChange={this.handleInput} />
					<select name="platform" onChange={this.handleInput}> 
						<option value="PC">PC</option> 
						<option value="playstation">playstation</option> 
						<option value="xbox">xbox</option> 
					</select>
					<input type="submit" value="Search" />
				</form>
			</div>
			)
	}
}

export default SearchBar;