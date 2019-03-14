import React, {Component} from 'react'; 
import ShowItems from './ShowItems';
import ItemCard from '../../Components/ItemCard';

class FortniteShop extends Component {

	constructor() {
		super(); 

		this.state={
			items:[], 
			showItem: false,
			indexItemToShow: '',
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

	cardModal = (item) => {
		this.setState({
			indexItemToShow: item,
			showItem: true
		});
	}

	closeModal = () => {
		this.setState({
			showItem: false
		})
	}

	render() {
		return(
			<div>
				<ShowItems items={this.state.items} show={this.cardModal} />
				{this.state.showItem ? 
					<div>
						<ItemCard item={null} item={this.state.indexItemToShow} closeModal={this.closeModal} />
						
					</div>
				:
				null
				}
			</div>
			)
	}
}

export default FortniteShop;