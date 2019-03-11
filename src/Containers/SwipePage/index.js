import NavBar from '../../Components/NavBar';

import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import UserCard from '../../Components/UserCard';
import database from '../../firebase/firebase';


class SwipePage extends Component {

	constructor() {
		super(); 
		this.state = {
			allUsers: [], 
			peopleLikedYou: [],
			
		}
	}

	componentDidMount() {
		this.getUsers();

		
		database.ref('users').on('value', (snapshot)=> {
			// snapshot is data from firease in its current state, what our db looks like in the moment 

			 const updatedUsers = [];

			 snapshot.forEach(childSnapshot => {	// this is a firebase for-each method, NOT js foreach, this will allow us to iterate through collecton
			 	updatedUsers.push( {
			 		id: childSnapshot.key, 
			 		...childSnapshot.val() // add any remianing key values pairs 
			 	})
			 })

			 this.setState({peopleLikedYou:[...updatedUsers]});

		});
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

	swipe = (action, randInt) => {
		if (action === "like") {
		const r = database.ref('users').set(localStorage.getItem('user'))
			.then(() => console.log('sucess! firebase was able to add!'))
			.catch((error) => console.log('firebase error',error));
		database.ref(`users/${localStorage.getItem('user')}`).push(this.state.allUsers[randInt].id);
		} else if (action === "pass") {
			// don't add to database
		} 

		// remove item from array 



	}

	render() {

		console.log('allUSer array', this.state.allUsers)
		const randInt = Math.floor(Math.random() * this.state.allUsers.length); // generates a random int everytime render() is called
		return (
			<div> 
				<NavBar loggedIn={this.props.loggedIn} error={this.props.error} />

				<UserCard user={this.state.allUsers[randInt]} />
				<button onClick={this.swipe.bind(null, "like", randInt)}> Like</button>
				<button onClick={this.swipe.bind(null, "pass", randInt)}> Pass</button>

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