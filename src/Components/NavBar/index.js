import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { logout } from '../../ReduxStuff/actions/authActions';

import AuthGateway from '../AuthGateway';


const Navbar = (props) => {

	return (
		<div className="navbar">
			<Link to ="/"> Home </Link>

			{props.loggedIn === true ? <button onClick={props.logout}> logout </button> : <AuthGateway />}
		</div>
		)
};


const mapDispatchToProps = (dispatch) => {
  return{
    logout: () => { logout(dispatch) }
  }
}

export default connect(null, mapDispatchToProps)(Navbar);