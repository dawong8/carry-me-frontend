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
                apex: "",
                apex_platform: "", 
                overwatch: "", 
                overwatch_platform: "",
                fortnite: "",
                fortnite_platform: "",
            },
            loginForm: {
                email: "",
                password: ""
            }, 
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
    render(){
        return(
            <div>
                {this.state.errorMsg ? this.state.errorMsg : null}
                <form onSubmit={this.handleRegister}>
                    <h5>REGISTER AS A NEW USER</h5>
                    Nickname: <input type="text" name="username" onChange={this.handleRegisterInput} required/>
                    email: <input type="text" name="email" onChange={this.handleRegisterInput} required/>
                    password: <input type="text" name="password" onChange={this.handleRegisterInput} required />
                    description/playstyle: <input type="text" name="description" onChange={this.handleRegisterInput} required />

                    <input type="submit"/>
                </form>
                <form onSubmit={this.handleLogin}>
                    <h5>LOGIN</h5>
                    Email: <input type="text" name="email" onChange={this.handleLoginInput}/>
                    password: <input type="text" name="password" onChange={this.handleLoginInput}/>
                    <input type="submit"/>
                </form>
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
