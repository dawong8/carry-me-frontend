import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { logout } from '../../ReduxStuff/actions/authActions';

import AuthGateway from '../AuthGateway';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			logout: false
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
	}

	render() {
		return (
		<div className="navbar">
			<Link to ="/"> Home </Link>
			{this.props.error}
			{this.props.loggedIn === true ? <button onClick={this.getLogout}> logout </button> : <button onClick={this.open}> Login </button> }

			{this.state.modal? <AuthGateway /> : null}

			{this.state.logout ? <Redirect to="/" /> : null}
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