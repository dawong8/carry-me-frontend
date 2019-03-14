import React, {Component} from 'react'; 
import NavBar from '../../Components/NavBar';
import FortniteShop from '../FortniteShop';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


// passing user prop to navbar bc its not rerendering
class HomePage extends Component {

	constructor() {
		super(); 
		this.state={
			shopbuttontext: "Daily Items",
			missionbuttontext: "Missions",
			hide: "hide", 
			mainPageColumn: "column-12",
			buttonPosition: "main-buttons",
		}
	}

	openShop = () => {
		if (this.state.shopbuttontext === "Daily Items") {
			this.setState({
				shopbuttontext: "Close Shop",
				hide: "",
				mainPageColumn: "column-6",
				buttonPosition: "",
			})
		} else if (this.state.shopbuttontext === "Close Shop") {
			this.setState({
				shopbuttontext: "Daily Items",
				hide: "hide",
				mainPageColumn: "column-12",
				buttonPosition: "main-buttons"
			})
		}
	}

	openMission = () => {

	}

	render() {
		return (
			<div className="container">



				
				{ this.props.loggedIn === true && this.props.user !== null && this.props.user !== "Email/Password Incorrect" ? localStorage.setItem('user', this.props.user.id) : null}

				<NavBar loggedIn={this.props.loggedIn}  error={this.props.error} />  

				<button className={"daily-items " + this.state.buttonPosition} onClick={this.openShop}> {this.state.shopbuttontext} </button>

				<div className="row">
					<div className={"column " + this.state.mainPageColumn}> 
						<img src="/cover.png" alt="logo" />
					
				
						{ this.props.loggedIn && this.props.error === "" ? <Redirect to="/swipe" /> : <p className="title">  Fortnite Social Networking. </p>}
					</div>

					<div className={"column column-6 shop-layout " + this.state.hide  }>
						<FortniteShop />
					</div>

				</div> 
				

				



			</div>
		)
	}
	
	
}

const mapStateToProps = (state) => {
  return{
    loggedIn: state.auth.loggedIn, // .auth is coming from the auth 
    fromWhere: state.auth.fromWhere, 
    user: state.auth.currentUser,
    error: state.auth.error
  }
}

export default connect(mapStateToProps) (HomePage);