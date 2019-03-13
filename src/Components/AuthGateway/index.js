import React, {Component} from 'react';

import { connect } from 'react-redux';
import { register, login } from '../../ReduxStuff/actions/authActions';

import './authgateway.css';

class AuthGateway extends Component{
    constructor(){
        super();
        this.state = {
            registerForm: {
                username: "",
                email: "", 
                password: "", 
                description: "",
                fortnite: "",
                fortnite_platform: "",
                accountId: "",
            },
            loginForm: {
                email: "",
                password: ""
            }, 
            readySubmit: false,
            err: "",
            loginButton: true,

        }
    }
    handleRegisterInput = (e) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleRegister = (e) => {
        e.preventDefault();
        this.props.register(this.state.registerForm);


    }
    handleLoginInput = (e) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [e.currentTarget.name] : e.currentTarget.value
            }
        })
    }
    handleLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state.loginForm);

    }
    connectFortnite = async (e) => {
        e.preventDefault();
        try {
            const temp = {
                username: this.state.registerForm.fortnite,
                platform: this.state.registerForm.fortnite_platform
            };
            console.log(temp)
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/game_data/fortnite`, {
                method: "POST",
                body: JSON.stringify(temp),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const parsedResponse = await response.json();

            console.log('paresed', parsedResponse);
            if (parsedResponse.error === "Player Not Found"){
                this.setState({
                    err: parsedResponse.error
                })
            } else {
                this.setState({
                    readySubmit: true,
                    registerForm : {
                        ...this.state.registerForm, 
                        accountId: parsedResponse.accountId
                    }
                })
            }

        } catch (err) {
            return err;
        }
    }

    buttonClicked = () => {
        this.setState({
            loginButton: !this.state.loginButton
        });
    }
    render(){
        return(
            <div>
                

                {  this.state.loginButton ? 
                    <div>
                        <img src="/Carry_me_2.png" alt="logo" />
                        <div className="error"> {this.props.error}</div>

                        <form className="login-form" onSubmit={this.handleLogin}>
                            
                            <p> Email: </p><input type="email" name="email" onChange={this.handleLoginInput}/> 
                            <p> Password:</p> <input type="password" name="password" onChange={this.handleLoginInput}/> 
                            <div className="buttons-spacing"> 
                                <input className="submit" type="submit"/> 
                                <span className="submit new-user" onClick={this.buttonClicked}> New User?</span>

                            </div>
                        </form>
                    </div>
                :
                    <div className="register-form row">
                        <form className="column column-6 register-col" onSubmit={this.handleRegister}>
                            <h5 className="register-title">Register</h5>
                                    <p> Nickname: </p> <input className="register-input" type="text" name="username" onChange={this.handleRegisterInput} required/>
                                    <p> email: </p> <input className="register-input" type="email" name="email" onChange={this.handleRegisterInput} required/>
                                

                                    <p> password: </p><input className="register-input" type="password" name="password" onChange={this.handleRegisterInput} required />
                                    <p> About me/playstyle:</p> <input className="register-input" type="text" name="description" onChange={this.handleRegisterInput} required />
                                
                            {this.state.readySubmit ? <input className="submit" type="submit"/> : null }

                        </form>
                        <form className="column column-6 register-col" onSubmit={this.connectFortnite}>
                                <p className="error"> {!this.state.readySubmit && this.state.err ? this.state.err: null} </p>
                                connect fortnite account <input className="register-input" type="text" name="fortnite" onChange={this.handleRegisterInput} required />
                                <select name="fortnite_platform" onChange={this.handleRegisterInput}> 
                                    <option value="">Select Console</option> 
                                    <option value="pc">PC</option> 
                                    <option value="psn">Playstation</option> 
                                    <option value="xbl">Xbox</option> 
                                </select>

                                { this.state.readySubmit ?  <p className="connected"> Connected! </p> : <div> <input className="connect-button" type="submit" value="Connect"/> </div>}
                                <h5 className="have-account" onClick={this.buttonClicked}> Login instead? </h5>


                        </form>  


                    </div>
                }


            </div>
        )
    }
}




const mapDispatchToProps = (dispatch) => {
    return{
        register: (formData) => { register(dispatch, formData)}, 
        login: (formData) => { login(dispatch, formData)}
    }
}


export default connect(null, mapDispatchToProps)(AuthGateway);
