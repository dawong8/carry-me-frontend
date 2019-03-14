import React, {Component} from 'react'; 

import NavBar from '../../Components/NavBar';
import { connect } from 'react-redux';

import './profile.css';

class ProfilePage extends Component {
	constructor() {
		super(); 
		this.state = {
			review: {
				rating: '50', 
				description: '',
				belong_to: '',

			}, 
			reviewSubmitted: false,
			me: {}, 
			allReviews: [],



		}
	}

	componentDidMount() {
		this.getUsers();
		this.allReviews();
	}

	getUsers = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users`); 

			const parsedResponse = await response.json();
			for (let a=0; a < parsedResponse.users.length; a++) {
				if (parsedResponse.users[a].id == this.props.match.params.handle) {
					this.setState({
						me: parsedResponse.users[a], 
						review: {
							...this.state.review,
							belong_to: this.props.match.params.handle
						}
					})
					return true;
				}
			}

			
		} catch (err) {
			return err;
		}
	}

	allReviews = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/reviews/1`); 

			const pas = await response.json();

			this.setState({
				allReviews: pas
			})

		} catch (err) {
			return err; 
		}
	}


	handleChange = (e) => {
		this.setState({
			review: {
				...this.state.review,
				[e.target.name]: e.target.value
			}
		})
	}

	sendReview = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/reviews/${localStorage.getItem('user')}`, {
				method: "POST",
                body: JSON.stringify(this.state.review),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
			}); 

			const pas = await response.json();

			let val = (parseInt(this.state.me.rating) + parseInt(this.state.review.rating)/2) ;
			console.log(val, 'my val')
			this.setState({
				reviewSubmitted: true,
				me : {
					...this.state.me, 
					rating: val,
				},
				allReviews: [...this.state.allReviews, pas]


			})
		} catch (err) {
			return err; 
		}
	}



	render() {

		console.log('this is me: ', this.state.allReviews)
		const form = (
				<form className="column column-12 review-form" onSubmit={this.sendReview}>
					<textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Leave anonymous review." required/>
					<div>
						<span>Overall Rating: </span>
						<select name="rating" onChange={this.handleChange} > 
	                        <option value='0'>Toxic</option> 
	                        <option value='50'>Ok</option> 
	                        <option value='100'>Bad</option> 
	                    </select>
	                    <div> <input className="submit" type="submit" value="Post" /> </div>

                    </div>
				</form>
			);

		const allOfReviews = this.state.allReviews.slice(0).reverse().map( (item, index) => {
			return (
				<div key={index}>
					<p className="review column column-12"> <span className="description"> anon. says: </span> "{item.description}"</p>
				</div>
				)
		})


		return (
			<div>

				
				<NavBar loggedIn={this.props.loggedIn} error={this.props.error} />
				<div className="row profile-body"> 

					<span className="column column-12"> 
						<div> 
							<span className="toxic"> {this.state.me.rating} % </span>
							<div className="descriptioning"> Toxicity rating </div>

						</div>
						<img className="toxicity-rating" src="http://www.iconarchive.com/download/i88221/icons8/ios7/Healthcare-Skull.ico" alt="skull-image"/>

						<p className="profile-title"> Meet {this.state.me.username} </p>

						<p className="fortnite-stats"> Platform: {this.state.me.fortnite_platform} </p>
						<p className="fortnite-stats"> Epic Games Username: {this.state.me.fortnite} </p>


					</span> 
				</div> 
				{
					this.state.reviewSubmitted ? 
					<p className="column-12 column thank-you"> Thank you for your review! </p> :
					<div className="row"> {form} </div>

				}
				<div className="row profile-body"> 
					<div className="column column-12">
						<p className="profile-title"> All Reviews </p>
						{allOfReviews}
					</div>
				</div>
			</div>

			)
	}
}

const mapStateToProps = (state) => {
  return{
    loggedIn: state.auth.loggedIn, // .auth is coming from the auth 
  }
}


export default connect(mapStateToProps) (ProfilePage);