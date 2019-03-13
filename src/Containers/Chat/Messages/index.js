import React from 'react'; 
import './message.css';


const Messages = (props) => {
	const allMsg = props.allMessages.map( (item, index) => {
		return (
			<div key={index}>
				{ item.sender === localStorage.getItem('user') ? <p className="my-message"> {item.message} </p> : <p className="your-message"> {item.message} </p>} 
			</div>

			)
	})

	return (

		<div> 
			{allMsg}
		</div>
		)
			
};

export default Messages;