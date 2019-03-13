import React from 'react';
import ChatContainer from '../Chat/ChatContainer';

import './matched.css';

const Matched = (props) => {

/*
	Props: 

	other : its the id of the other person that you matched with you 
	chatroom_id

*/
	return (
		<div className={"matched-modal " + props.hide} > 
			<h1> Matched! </h1>

			<ChatContainer other={props.other} chatroom_id={props.chatroom_id} />
			<button onClick={props.closeModal}> Meet Others</button> 
		</div>
		)
}


export default Matched;