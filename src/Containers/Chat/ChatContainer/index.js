import React, {Component} from 'react';
import database from '../../../firebase/firebase'

import Messages from '../Messages';

import './chat.css';

class ChatContainer extends Component{

/*

	props:

	other : its the id of the other person that you matched with you 
	chatroom_id

*/


	constructor(){
		super(); 
		this.state = {
			message: {
				chatroom_id: '', 
				message: '', 
				sender: '', // me 
				receiver: '', // other person
			}, 
			allMessages: [],
		};
	}
	
	componentDidMount() {
		this.createChatroom();
	}

	createChatroom = () => {
		// database.ref(`chat:${this.props.chatroom_id}`).set({test: "test"})
		// .then(() => console.log('Data Written Successfully'))
		// .catch(error => console.log('Firebase Error: ', error))


		this.setState({
			message: {
				...this.state.message, 
				chatroom_id: this.props.chatroom_id,
				sender: localStorage.getItem('user'),
				receiver: this.props.other,

			}
		});
		this.getMessages();


	}

	// getMessages = () => {
	// 	database.ref(`chat:${this.props.chatroom_id}`).on('value', (snapshot)=> {
	// 		// snapshot is data from firease in its current state, what our db looks like in the moment 

	// 		// console.log(snapshot);

	// 		 const updatedUsers = [];

	// 		 snapshot.forEach(childSnapshot => {	// this is a firebase for-each method, NOT js foreach, this will allow us to iterate through collecton
	// 		 	updatedUsers.push( {
	// 		 		id: childSnapshot.key, 
	// 		 		...childSnapshot.val() // add any remianing key values pairs 
	// 		 	})
	// 		 })

	// 		 this.setState({allMessages:[...updatedUsers]});

	// 	});
	// }


	getMessages = async () => {
		console.log('what', this.props.chatroom_id)
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/chat/${this.props.chatroom_id}`);
			console.log(response, 'wha')
			const p = await response.json();
			console.log('response? ', p, 'localStorage', localStorage.getItem('user'))
			this.setState({
				allMessages: p
			});
		} catch (err) {
			return err; 
		}
	}

	handleInput = (e) => {
		let temp = new Date();
		this.setState({
			message: {
				...this.state.message,
				[e.target.name]: e.target.value,
			}
		})
	}
	sendMessage = async (e) => {
		e.preventDefault();


		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/chat/${this.props.chatroom_id}`, {
                method: "POST",
                body: JSON.stringify(this.state.message),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsed = await response.json();

            this.setState({
            	allMessages: [...this.state.allMessages, parsed]
            })
		} catch (err) {
			return err; 
		}
		// database.ref(`chat:${this.props.chatroom_id}`).push(temp)
		// .then(() => console.log('Data Written Successfully'))
		// .catch(error => console.log('Firebase Error: ', error))

		this.setState({
			message: {
				...this.state.message, 
				message: '',
			}
		});

	}




	render() {
		console.log('almessages', this.state.message)
		return (

			<div> 

				<div className="message-history"> 
					<Messages allMessages={this.state.allMessages} />
				</div>

				<form onSubmit={this.sendMessage}> 
					<input type="text" name="message" value={this.state.message.message} onChange={this.handleInput} />
					<input type="submit" value="send" /> 
				</form> 
			</div>
			)
	}


}

export default ChatContainer;