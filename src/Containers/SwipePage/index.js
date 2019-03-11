import NavBar from '../../Components/NavBar';

import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import UserCard from '../../Components/UserCard';

class SwipePage extends Component {

	constructor() {
		super(); 
		this.state = {
			allUsers: []
		}
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = async () => {
		try {
			console.log('current logged in user is:', localStorage.getItem('user'))
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${localStorage.getItem("user")}`); 

			const parsedResponse = await response.json();
			this.setState({
				allUsers: parsedResponse
			})
		} catch (err) {
			return err;
		}
	}

	swipe = (action) => {
		if (action === "like") {

		} else if (action === "pass") {

		} 

		// remove item from array 
	}

	render() {

		console.log('allUSer array', this.state.allUsers)

		return (
			<div> 
				<NavBar loggedIn={this.props.loggedIn} error={this.props.error} />
				hi i am swipe page

				<UserCard user={this.state.allUsers[Math.floor(Math.random() * this.state.allUsers.length)]} />
				<button onClick={this.swipe.bind(null, "like")}> Like</button>
				<button onClick={this.swipe.bind(null, "pass")}> Pass</button>

			</div>

			)
	}
}

const mapStateToProps = (state) => {
  return{
    loggedIn: state.auth.loggedIn, // .auth is coming from the auth 
    error: state.auth.error,
    id: state.auth.id, 
  }
}


export default connect(mapStateToProps) (SwipePage);