import React, {Component} from 'react';
import { connect } from 'react-redux';
import { edit } from '../../ReduxStuff/actions/authActions';


import { Redirect } from 'react-router-dom';


// this page renders right after user is registered or when a existing user wants to edit profile.
class EditProfile extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				apex: '',
				apex_platform: '',
				overwatch: '',
				overwatch_platform: '',
				fortnite: '',
				fortnite_platform: ''
			}, 
			redirect: false
		}
	}

	componentDidMount() {
		// localStorage.setItem('user', this.props.user);


		this.setState({
			// user: localStorage.getItem('user')
		});
	}


	handleInput = (e) => {
		this.setState({
			user: {
				...this.state.user, 
				[e.target.name]: e.target.value
			}
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.edit(this.state.user, this.props.id);
		this.setState({
			redirect: true
		})
	}

	render() {
		console.log('this.state.user', this.state.user)
		return (
			<div> 
				{
					this.state.redirect ? 
					<Redirect to='/what' /> : 
					<form onSubmit={this.handleSubmit}> 
						<p> Please complete your profile. </p>

						apex <input type="text" name="apex" onChange={this.handleInput} />	
						<select name="apex_platform" onChange={this.handleInput}> 
							<option value="">Select Console</option> 

							<option value="PC">PC</option> 
							<option value="playstation">playstation</option> 
							<option value="xbox">xbox</option> 
						</select>

						ow <input type="text" name="overwatch" onChange={this.handleInput} />
						<select name="overwatch_platform" onChange={this.handleInput}> 
						<option value="">Select Console</option> 
							<option value="pc">PC</option> 
							<option value="psn">playstation</option> 
							<option value="xbl">xbox</option> 
						</select>

						fortnite <input type="text" name="fortnite" onChange={this.handleInput} />
						<select name="overwatch_platform" onChange={this.handleInput}> 
						<option value="">Select Console</option> 
							<option value="pc">PC</option> 
							<option value="psn">playstation</option> 
							<option value="xbl">xbox</option> 
						</select>
						<input type="submit" value="Continue"/> 
					</form>
				

				}
				
			</div>
			)
	}
}




const mapDispatchToProps = (dispatch) => {
    return{
		edit: (formData, id) => { edit(dispatch, formData, id)}, 

    }
}


export default connect(null, mapDispatchToProps)(EditProfile);

