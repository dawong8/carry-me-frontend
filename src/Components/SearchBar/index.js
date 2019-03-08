import React, {Component} from 'react'; 
import SearchResults from '../SearchResults';

class SearchBar extends Component {
	constructor() {
		super(); 
		this.state = {
			search: {
				username: '', 
				platform: 'PC',
			},
			platform: 'PC',  // Pc is the default
			searchResults: [],
			msg: '',


			pageNumber: 0,
		}
	}

	handleInput = (e) => {
		this.setState({
			search: {
				...this.state.search, 
				[e.target.name]: e.target.value

			}
		})
	}

	handleSubmit = (e) => {
		e.preventDefault(); 

		this.fetchResults();

	}


	fetchResults = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/game_data`, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state.search),
				headers: {
					'Content-Type': 'application/json'
					}
			});

			if (!response.ok) {
	          throw Error(response.statusText);
	        }

	        const responseParsed = await response.json();
			if (responseParsed.totalresults !== 0) {
				this.setState({
	        		searchResults: responseParsed.results, 
	        		pageNumber: 0
	       		 })
			} else {
				this.setState({
					msg: 'no user found'
				})
			}
	        
		} catch (err) {
			return err; 
		}
	}
	
	nextPage = (action) => { // action - false: previous page, true: next page 


		if (this.state.pageNumber >= this.state.searchResults.length || this.state.pageNumber < 0) {
			console.log('page number greater than num users')
			return null
		} else if(action) {
			this.setState({
				pageNumber: this.state.pageNumber + 5
			});
		} else {
			this.setState({
				pageNumber: this.state.pageNumber - 5
			});
		}
		
	}

	render() {
		console.log('sending over', this.state )
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Username
					<input type="text" name="username" value={this.state.search.username} onChange={this.handleInput} />
					<select name="platform" onChange={this.handleInput}> 
						<option value="PC">PC</option> 
						<option value="playstation">playstation</option> 
						<option value="xbox">xbox</option> 
					</select>
					<input type="submit" value="Search" />
				</form>

				{ this.state.msg ? this.state.msg : null}

				{ this.state.searchResults.length !== 0 && this.state.searchResults.length !== this.state.pageNumber + 5 ? <button onClick={this.nextPage.bind(null, true)}> NEXT Page? You are on pg {this.state.pageNumber / 5 + 1 }</button> : null }
				{ this.state.searchResults.length !== 0 && this.state.pageNumber > 0 ? <button onClick={this.nextPage.bind(null, false)}> PREVIOUS Page. On Pg # { this.state.pageNumber / 5 + 1 }</button> : null}


				<SearchResults searchResults={this.state.searchResults} startingIndex={this.state.pageNumber}/>
			</div>
			)
	}
}

export default SearchBar;