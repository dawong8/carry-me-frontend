import React from 'react'; 

import '../items.css';
// might need own css file for this

const ShowItems = (props) => {

	const eachItem = props.items.map( item => {
		return (
			<div className="column column-4"> 
				<img className={`items ${item.rarity}`} src={item.imageUrl} alt="item" />
			</div>
			)
	})

	return (
		<div className="row">
			{eachItem}
		</div>
		)
}

export default ShowItems;