import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { logout } from '../../ReduxStuff/actions/authActions';

import AuthGateway from '../AuthGateway';
import AllMessages from '../../Containers/Chat/AllMessages';

import './navbar.css';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			messages: false,
			swipe: false, 
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
			logout: true // hmmm....?
		})
		console.log('logout clicked')
	}

	openSwipe = () => {
		this.setState({
			swipe: true
		})
	}

	openMessages = () => {
		this.setState({
			messages: true
		})
	}

	render() {

		// search modal pops up when clicked "search"
		

		return (
		<div className="navbar">
			<Link className="links nav-items-text" to ="/"> Carry me </Link>
			<span className="nav-items"> - </span>



			

			{localStorage.getItem('user') !== null ? 
				<span>

					<Link className="links nav-items-text" to = "/swipe"> Swipe </Link>
					<span className="nav-items"> - </span>

					<Link className="links nav-items-text" to = "/messages"> Messages </Link>
					<span className="nav-items"> - </span>

					<button className="log nav-items-text" onClick={this.getLogout}> logout </button> 


				</span>
				: 
				<span>
					{ this.state.modal ?  <button className="log nav-items-text close-login" onClick={this.open}> Close </button> : <button className="log nav-items-text" onClick={this.open}> Login </button>} 
					<Redirect to="/"/>
				</span>


			 }






			 <div className="hamburger"> 
			 		&#9776;
			 </div>

			{this.state.modal? 
				<div className="login-modal"> 
					<AuthGateway error={this.props.error} /> 

				</div>
				: null}

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