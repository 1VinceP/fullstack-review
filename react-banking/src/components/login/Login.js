import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    render() {
        return(
            <div className='body'>
                <h1>Login</h1>
                <input className='input' placeholder='Username'/>
                <input className='input' placeholder='Password'/>
                <button>Log in</button>
            </div>
        )
    }
}

export default Login;