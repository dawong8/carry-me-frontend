import React, {Component} from 'react';

import NavBar from '../../../Components/NavBar';
import ChatContainer from '../ChatContainer';

import './allmessages.css';

class AllMessages extends Component {
	constructor() {
		super(); 
		this.state = {
			allMessages: [],
			messageHistory: [],
			allUsers: [],

			other: '', 
			chatroomid: '',
		}
		this._isMounted = false;

	}

	componentDidMount() {

		this._isMounted = true;
		console.log('what')

		this._isMounted && this.getMyMessages();
		this._isMounted && this.getUsers();

	}

	componentWillUnmount() {
	   this._isMounted = false;
	}

	removeDuplicates = (arr) => {
		let temp = [];
		for (let a = 0; a < arr.length; a++){
			let hi = false;
			for (let b = 0; b < temp.length; b++) {
				if (temp[b].receiver === arr[a].receiver) {
					hi = true; 
				}
			}
			if (!hi) {
				temp.push(arr[a]);

			} else {
				hi = false;
			}
		}

		return temp;
	}

	getUsers = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/1`); 

			const parsedResponse = await response.json();
			this._isMounted && this.setState({
				allUsers: parsedResponse
			})
		} catch (err) {
			return err;
		}
	}

	getMyMessages = async () => {
		try {
			const temp = {
				chatroom_id: '',
				message: '',
				sender: '1',//localStorage.getItem("user"),
				receiver: ''
			}
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/chat`, {
		        method: "POST",
		        body: JSON.stringify(temp),
		        credentials: 'include',
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    });

			const parsedResponse = await response.json();
			console.log(parsedResponse, "here")
			// pasedresponse should be an array 

			const noDuplicates = this.removeDuplicates(parsedResponse);

			

			this._isMounted && this.setState({
				allMessages: noDuplicates
			})
		} catch (err) {
			return err; 
		}
	}

	getHistory = (other, chatroomid) => {
		// try {
		// 	const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/chat/${id}`);

		// 	const parsedResponse = await response.json();

		// 	this.setState({
		// 		messageHistory: parsedResponse
		// 	});
		// } catch (err) {
		// 	return err; 
		// }
		console.log('clicked hostry')
		this.setState({
			other: other, 
			chatroomid: chatroomid,
		})
	}


	// convertId = async (id) => {
	// 	try {
	// 		const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${id}`, {
	// 	        method: "POST",
	// 	        credentials: 'include',
	// 	        headers: {
	// 	            'Content-Type': 'application/json'
	// 	        }
	// 	    });

	// 	    const parsedResponse = await response.json();
	// 	    console.log(parsedResponse, 'here')
	// 	    return parsedResponse.username;

	// 	} catch (err) {
	// 		return err; 
	// 	}
	// }

	render() {
		console.log('hist', this.state.messageHistory)
		const showMsg = this.state.allUsers.map( (item, index) => {
			for (let i = 0; i < this.state.allMessages.length; i++) {
				if (item.id == this.state.allMessages[i].receiver) {
					return (
						<span key={index} onClick={this.getHistory.bind(null, this.state.allMessages[i].receiver, this.state.allMessages[i].chatroom_id)}> 
							{item.id == this.state.allMessages[i].receiver ? item.username : null}
						</span>
					)
				}
			}
			
		});

		// const thisExpensive = this.state.messageHistory.map( (item, index) => {
		// 	return (<span key={index}>
		// 		{
		// 			item.sender === localStorage.getItem('user') ? 
		// 			<div className="message-box my-message" >
		// 				{item.message}
		// 			</div> 
		// 			:
		// 			<div className="message-box your-message">
		// 				{item.message}
		// 			</div> 

		// 		}
		// 		</span>

		// 		)
		// });

		return (
			<div className="row">
				<NavBar />
				<div className="side-contacts column column-4"> 
					<h5 className="each-person"> From: {showMsg} </h5>
				</div>
				<div className="whole-history column column-8"> 
					{ this.state.other !== "" ? <ChatContainer other={this.state.other} chatroom_id={this.state.chatroomid} /> : null}
				</div>	
			</div>
			)
	}
}

export default AllMessages;