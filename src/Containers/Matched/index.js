import React from 'react';
import ChatContainer from '../Chat/ChatContainer';

const Matched = (props) => {

/*
	Props: 

	other : its the id of the other person that you matched with you 
	chatroom_id

*/
	return (
		<div> 
			<h1> There is a match. (i'd like this to be a modal) </h1>

			<ChatContainer other={props.other} chatroom_id={props.chatroom_id} />
		</div>
		)
}


export default Matched;