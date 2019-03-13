import React, {Component} from 'react'; 
import ShowItems from './ShowItems';

class FortniteShop extends Component {

	constructor() {
		super(); 

		this.state={
			items:[]
		}

		this._isMounted = false;

	}
	componentDidMount() {
		this._isMounted = true;

		this._isMounted && this.getItems();
	}


	componentWillUnmount() {
	   this._isMounted = false;
	}
	getItems = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/game_data/fortnite`); 

			const parsedResponse = await response.json();

			this._isMounted && this.setState({
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