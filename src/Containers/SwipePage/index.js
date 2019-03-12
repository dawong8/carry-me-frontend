import NavBar from '../../Components/NavBar';

import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import UserCard from '../../Components/UserCard';
import Matched from '../Matched';

class SwipePage extends Component {

	constructor() {
		super(); 
		this.state = {
			allUsers: [], 
			currentRelations: [],
			matched: false,
			other_person: '', // id of the other person you matched with 
			chatroom_id: '',
			
		}
	}

	componentDidMount() {
		this.getUsers();

		this.filterUsers();
		

	
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

	arrayDifference = (arr1, arr2)  =>{
		let diff = [];
		let store = true; 
		for (let a = 0; a < arr2.length; a++) {
			for (let b = 0; b < arr1.length; b++) {
				if (arr2[a].id == arr1[b].other_person) {
					store = false;
				}
			}
			if (store) {
				diff.push(arr2[a]);
			} else {
				store = true;
			}
		}
		return diff;
	}

	filterUsers = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/relationship/${localStorage.getItem("user")}`);

			const parsedResponse = await response.json();

			// paredResponse should return array of objs {my id, other id, relationship}

			// console.log('parsedResponse', parsedResponse, 'allUsers', this.state.allUsers)
			let newArray = this.arrayDifference(parsedResponse, this.state.allUsers);


			// console.log('newArray', newArray);

			this.setState({
				allUsers: newArray, 
				currentRelations: parsedResponse
			})

		} catch (err) {
			return err; 
		}
	}

	// checkIfMatch = async (other_person_id) => {
	// 	console.log('checkIfMatch is getting called')
	// 	try {
	// 		console.log('inside the try loop')

	// 		const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/relationship/${other_person_id}`);
	// 		console.log('we have a response!')

	// 		const parsedResponse = await response.json(); 

	// 		// pasedResponse is an array of relationship objects 

	// 		console.log('other person relationship', parsedResponse);

	// 		for (let a = 0; a < parsedResponse.length; a++) {

	// 			console.log("their other person", parsedResponse[a].other_person, "my id", localStorage.getItem('user'), "their relation to you", parsedResponse[a].like);
	// 			if (parsedResponse[a].other_person === localStorage.getItem('user') && parsedResponse[a].like) {
	// 				return true; 
	// 			}
	// 		}
	// 		return false;
	// 	} catch (err) {
	// 		return err; 
	// 	}
	// } 

	generateID = () => {
		  let text = "";
		  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		  for (let i = 0; i < 5; i++)
		    text += possible.charAt(Math.floor(Math.random() * possible.length));

		  return text;
	}
	swipe = async (action, randInt) => { // action -- true: like, false: pass
		try {
			let chat = this.generateID();
			let relation = { 
				owner_id: localStorage.getItem('user'),
				other_person: this.state.allUsers[randInt].id,
				like: action, 
				chatroom_id: chat
			}

			// we are creating a brand new relationship 
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/relationship`, {
		        method: "POST",
		        body: JSON.stringify(relation),
		        credentials: 'include',
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    });


		    const parsedResponse = await response.json(); 
		    // still want to filter, bc componentDidMount doesn't get called again when we do this function 

		    let tempArray = this.state.allUsers.filter( item => item !== this.state.allUsers[randInt]); 

		    this.setState({
		    	allUsers: tempArray, 
		    	currentRelations: [ ...this.state.currentRelations, parsedResponse]
		    })

		    // after we swiped successfully and created a relationship, we want to check if there is a match 

		    if (action) { //check only if you like them
		    	try {
		    		const r = await fetch(`${process.env.REACT_APP_API}/api/v1/users/relationship/${localStorage.getItem('user')}`, {
				        method: "POST",
				        body: JSON.stringify(relation),
				        credentials: 'include',
				        headers: {
				            'Content-Type': 'application/json'
				        }
				    });


				    const p = await r.json();
				    console.log('matched???' , p);

				    if (p === "Found") {
				    	this.setState({
				    		matched: true,
				    		other_person: relation.other_person,
				    		chatroom_id: relation.chatroom_id,

				    	})
				    }
		    	} catch (err) {
		    		return err; 
		    	}


		    }
		    // else do nothing

		} catch (err) {
			return err; 
		}


	}

	render() {

		// console.log('allUser array', this.state.allUsers)
		const randInt = Math.floor(Math.random() * this.state.allUsers.length); // generates a random int everytime render() is called
		return (
			<div> 
				<NavBar loggedIn={this.props.loggedIn} error={this.props.error} />

				{this.state.allUsers.length !== 0 ? 
					<div> 
						<UserCard user={this.state.allUsers[randInt]} /> 
						<button onClick={this.swipe.bind(null, true, randInt)}> Like</button>
						<button onClick={this.swipe.bind(null, false, randInt)}> Pass</button>
					</div>
					: <p> No more users available. Sorry! </p>} 
				{ this.state.matched ? <Matched other={this.state.other_person} chatroom_id={this.state.chatroom_id} /> : null}

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