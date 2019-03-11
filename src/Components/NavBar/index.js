import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { logout } from '../../ReduxStuff/actions/authActions';

import AuthGateway from '../AuthGateway';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			modal: false
		}
	}

	open = () =>{
		this.setState({
			modal: !this.state.modal
		});
	}
	render() {
		return (
		<div className="navbar">
			<Link to ="/"> Home </Link>
			{this.props.error}
			{this.props.loggedIn === true ? <button onClick={this.props.logout}> logout </button> : <button onClick={this.open}> Login </button> }

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