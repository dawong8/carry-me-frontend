import React, {Component} from 'react'; 
import SearchBar from '../../Components/SearchBar'
import NavBar from '../../Components/NavBar';

import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';





// THIS COMPONENT is the swipe screen, handles the swipes  
class WhatGame extends Component {
	constructor() {
		super(); 
		this.state = {
			user: null, 
			availableUsers: [],

		}
	}
	componentDidMount() {
		this.setState({
			user: this.props.user
		});
	}

	getMatches = async () => {
		try {
			
		} catch (err) {
			return err;
		}
	}

	render() {
		console.log('user is', this.state.user)
		return (
		<div>
			<NavBar loggedIn={this.props.loggedIn} />
			{this.props.loggedIn ? 			
				<p> What Game do you want to search for? i love this app </p>
				:
				<Redirect to ="/" />
			}




		</div>
		)

	}
	
	
}

const mapStateToProps = (state) => {
  return{
    loggedIn: state.auth.loggedIn, // .auth is coming from the auth 
    user: state.auth.currentUser,
    fromWhere: state.auth.fromWhere
  }
}

export default connect(mapStateToProps) (WhatGame);