import React from 'react'; 

const UserCard = (props) => {
	console.log("im at usercard", props.user);
	return (
		<div> 
			{typeof props.user === "undefined" ? null : props.user.username}
		</div>
		)
}

export default UserCard;