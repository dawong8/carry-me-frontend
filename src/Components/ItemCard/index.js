import React from 'react'; 
import './itemcard.css';

const ItemCard = (props) => {
	console.log(props.item)
	return (
		<div className="item-card">
				<img className={`items-image ${props.item.rarity}`} src={props.item.imageUrl} alt="item" />
				<p> {props.item.vBucks} <img className="vbucks" src="https://gamepedia.cursecdn.com/fortnite_gamepedia/f/f3/V-bucks_icon.png" alt="vbucks"/> </p> 
				<div> <button className="submit" onClick={props.closeModal}> Close </button></div>
		</div>
		)
}

export default ItemCard;