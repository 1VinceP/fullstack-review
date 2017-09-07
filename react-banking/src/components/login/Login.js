import React, { Component } from 'react';
import './login.css';
import logo from './communityBank.svg';

class Login extends Component {

    render() {
        // console.log( process.env.REACT_APP_LOGIN )
        return(
            <div className='body'>
                <img src={logo} className='logo' />
                <h1 className='title'>Log in</h1>
                <input className='input' placeholder='Username'/>
                <input className='input' type='password' placeholder='Password'/>
                <a href={process.env.REACT_APP_LOGIN}><button className='button'>Log in</button></a>
            </div>
        )
    }
}

export default Login;