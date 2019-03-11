import React from 'react'; 
import SearchBar from '../../Components/SearchBar'
import NavBar from '../../Components/NavBar';
import EditProfile from '../EditProfile';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


// passing user prop to navbar bc its not rerendering
// 
const HomePage = (props) => {

	return (
		<div className="container">



			
			{ props.loggedIn === true && props.user !== null && props.user !== "Email/Password Incorrect" ? localStorage.setItem('user', props.user.id) : console.log('not storing in local storage', "localstorage user", localStorage.getItem('user'), 'what is props.login right now', props.loggedIn)}

			<NavBar loggedIn={props.loggedIn}  error={props.error} />  


			
				
			
			<div>

				<img src="/Carry_me_2.png" alt="logo" />

				<h1> subline </h1>

				
			</div>
			{ props.loggedIn && props.error === "" ? <Redirect to="/swipe" /> : <p> something's wrong </p>}


		</div>
		)
	
}

const mapStateToProps = (state) => {
  return{
    loggedIn: state.auth.loggedIn, // .auth is coming from the auth 
    fromWhere: state.auth.fromWhere, 
    user: state.auth.currentUser,
    error: state.auth.error
  }
}

export default connect(mapStateToProps) (HomePage);