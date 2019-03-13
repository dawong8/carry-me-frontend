import React, {Component} from 'react'; 
import './usercard.css';

class UserCard extends Component {

	constructor() {
		super();
		this.state={
			fortniteAccountInfo: null,
		}

	}
	componentDidMount() {
		this.getFortniteInfo(this.props.user.fortnite, this.props.user.fortnite_platform);
	}

	getFortniteInfo = async (username, platform) => {
		try {
			const temp = {
				username: username, 
				platform: platform
			}
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/game_data/fortnite`, {
		        method: "POST",
		        body: JSON.stringify(temp),
		        credentials: 'include',
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    });

			const parsedResponse = await response.json();

			this.setState({
				fortniteAccountInfo: parsedResponse
			})
			
		} catch (err) {
			return err; 
		}
	}

	render() {

		console.log("im at usercard", this.state.fortniteAccountInfo);
		return (
			<div className="contains-card"> 
				{typeof this.props.user === "undefined" ? null : 
				<div>
					<div className="usercard-container">
						<img src="/Carry_me.png" alt="logo" />


						<h5 className="username-title"> {this.props.user.username} </h5>
						<span> {this.props.user.fortnite_platform} </span> 
						{ this.state.fortniteAccountInfo ? 
							<div> 
								<p className="fortnite-stats"> # Kills: {this.state.fortniteAccountInfo.stats.p2.kills.value} </p>
								<p className="fortnite-stats"> Win Rate: {this.state.fortniteAccountInfo.stats.p2.winRatio.value} % </p>

							</div>

						: null}
						<p className="description"> About Me/Playstyle: {this.props.user.description}</p>
						<div> 
							<img className="toxicity-rating" src="http://www.iconarchive.com/download/i88221/icons8/ios7/Healthcare-Skull.ico" alt="skull-image"/>
							<span className="toxic"> {this.props.user.rating} %</span>
						</div>
					</div>
				</div>
				}
			</div>
			)



	}

}

export default UserCard;