import React from 'react'; 

import '../items.css';
// might need own css file for this

const ShowItems = (props) => {

	const eachItem = props.items.map( (item, index) => {
		if (index < 9) {
			return (
				
					<div className="column column-4" key={index}> 
						<img className={`items ${item.rarity}`} src={item.imageUrl} alt="item" />
					</div>

				)
		}
	})

	return (
		<div className="row">
			{eachItem}
		</div>
		)
}

export default ShowItems;