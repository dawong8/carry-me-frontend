import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { logout } from '../../ReduxStuff/actions/authActions';

import AuthGateway from '../AuthGateway';

import './navbar.css';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
		}
	}

	open = () =>{
		this.setState({
			modal: !this.state.modal
		});
	}

	getLogout = () => {
		this.props.logout();
		this.setState({
			logout: true
		})
		console.log('logout clicked')
	}

	render() {

		// search modal pops up when clicked "search"

		return (
		<div className="navbar">
			<Link className="links nav-items-text" to ="/"> Home </Link>
			<span className="nav-items"> - </span>
			{this.props.error}
			{this.props.loggedIn === true ? 
				<div>
					<button className="log nav-items-text" onClick={this.getLogout}> logout </button> 
					<p> view my matches, messages </p>

				</div>
				: 
				<span>
					<button className="log nav-items-text" onClick={this.open}> Login </button>
					<span className="nav-items"> - </span>

					<span className="nav-items-text"> search </span> 
					<Redirect to="/" />
				</span>


			 }

			 <div className="hamburger"> 
			 		&#9776;
			 </div>

			{this.state.modal? <AuthGateway /> : null}

		</div>
		)
	}
	
};


const mapDispatchToProps = (dispatch) => {
  return{
    logout: () => { logout(dispatch) }
  }
}

export default connect(null, mapDispatchToProps)(Navbar);