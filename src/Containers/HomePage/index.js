import React from 'react'; 
import SearchBar from '../../Components/SearchBar'
import NavBar from '../../Components/NavBar';
import EditProfile from '../EditProfile';

import { connect } from 'react-redux';

// passing user prop to navbar bc its not rerendering
// 
const HomePage = (props) => {

	return (
		<div>

			<h1> {props.error !== '' ? props.error : null}</h1>


			
			{ props.loggedIn === true && props.user !== null && props.user !== "Email/Password Incorrect" ? localStorage.setItem('user', props.user) : console.log('not storing in local storage', "localstorage user", localStorage.getItem('user'), 'what is props.login right now', props.loggedIn)}

			<NavBar loggedIn={props.loggedIn}  />  


			{localStorage.getItem('user') !== null && props.user !== "Email/Password Incorrect" && props.loggedIn ? 
			
				<EditProfile id={props.user.id} />
				
			:
			<div>
				<h1> Logo </h1>

				<h1> Subtitle </h1>

				<SearchBar/>
			</div>
			}


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