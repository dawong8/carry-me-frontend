import React, {Component} from 'react';
import database from '../../../firebase/firebase'

import Messages from '../Messages';

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
				text: "",
				date: null, 
			}, 
			allMessages: [],
		};
	}
	
	componentDidMount() {
		this.createChatroom();
	}

	createChatroom = () => {
		database.ref(`chat:${this.props.chatroom_id}`).set({name: "jeff"})
		.then(() => console.log('Data Written Successfully'))
		.catch(error => console.log('Firebase Error: ', error))

	}


	handleInput = (e) => {
		let temp = new Date();
		this.setState({
			message: {
				[e.target.name]: e.target.value,
				date: temp.toString(),

			}
		})
	}
	sendMessage = (e) => {
		e.preventDefault();

		let temp = {
			[`${this.state.message.date}`]: `${this.state.message.text}`
		}

		console.log('message', temp);

		database.ref(`chat:${this.props.chatroom_id}`).push(temp)
		.then(() => console.log('Data Written Successfully'))
		.catch(error => console.log('Firebase Error: ', error))

		this.setState({
			message: {
				text: '',
				date: null
			}
		});

	}

	updateChatHistory = () => {
		// this is where we are gonna store the chat history into the array
	}



	render() {

		return (

			<div> 

				i am chat ChatContainer


				<form onSubmit={this.sendMessage}> 
					<input type="text" name="text" value={this.state.message.text} onChange={this.handleInput} />
					<input type="submit" value="send" /> 
				</form> 
			</div>
			)
	}


}

export default ChatContainer;