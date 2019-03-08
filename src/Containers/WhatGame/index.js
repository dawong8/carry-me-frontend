import React from 'react'; 
import SearchBar from '../../Components/SearchBar'
import NavBar from '../../Components/NavBar';

import { connect } from 'react-redux';

// passing user prop to navbar bc its not rerendering
// 
const WhatGame = (props) => {

	return (
		<div>


			<p> What Game do you want to search for? </p>


			


		</div>
		)
	
}

const mapStateToProps = (state) => {
  return{
    loggedIn: state.auth.loggedIn, // .auth is coming from the auth 
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps) (WhatGame);