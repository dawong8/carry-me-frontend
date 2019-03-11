import React, {Component} from 'react';

import { connect } from 'react-redux';
import { register, login } from '../../ReduxStuff/actions/authActions';

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
    render(){
        return(
            <div>
                
                <div>
                    <form onSubmit={this.handleRegister}>
                        <h5>REGISTER AS A NEW USER</h5>
                        Nickname: <input type="text" name="username" onChange={this.handleRegisterInput} required/>
                        email: <input type="text" name="email" onChange={this.handleRegisterInput} required/>
                        password: <input type="text" name="password" onChange={this.handleRegisterInput} required />
                        description/playstyle: <input type="text" name="description" onChange={this.handleRegisterInput} required />
                          
                        {this.state.readySubmit ? <input type="submit"/> : <span> Not ready! </span> }
                    </form>
                    <form onSubmit={this.connectFortnite}>
                            <p> {this.state.err} </p>
                            connect fortnite account <input type="text" name="fortnite" onChange={this.handleRegisterInput} required />
                            <select name="fortnite_platform" onChange={this.handleRegisterInput}> 
                                <option value="">Select Console</option> 
                                <option value="pc">PC</option> 
                                <option value="psn">playstation</option> 
                                <option value="xbl">xbox</option> 
                            </select>
                            { this.state.readySubmit ?  <p> Connected! </p> : <input type="submit" value="Connect"/>}
                    </form>  

                    <br/> <br/>
                    <form onSubmit={this.handleLogin}>
                        <h5>LOGIN</h5>
                        Email: <input type="text" name="email" onChange={this.handleLoginInput}/>
                        password: <input type="text" name="password" onChange={this.handleLoginInput}/>
                        <input type="submit"/>
                    </form>
                </div>
                
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
