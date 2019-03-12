import React, {Component} from 'react'; 
import ShowItems from './ShowItems';

class FortniteShop extends Component {

	constructor() {
		super(); 

		this.state={
			items:[]
		}
	}
	componentDidMount() {
		this.getItems();
	}

	getItems = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/game_data/fortnite`); 

			const parsedResponse = await response.json();

			this.setState({
				items: parsedResponse
			});


		} catch (err) {
			return err; 
		}
	}
	render() {
		return(
			<div>
				<ShowItems items={this.state.items} />
			</div>
			)
	}
}

export default FortniteShop;