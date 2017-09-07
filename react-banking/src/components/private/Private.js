import React, { Component } from 'react';
import './private.css';

import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/user-reducer'

class Private extends Component {

    componentDidMount() {
        this.props.getUserInfo()
    }

    render() {
        console.log( this.props.user )
        return(
            <div className='body'>
                <h1>Community Bank</h1>
                <div className='display'>
                    <h4>Account Information</h4>
                    { this.props.user ? <img className='avatar' src={ this.props.user.image } alt='' />
                    : null }
                    <div>
                        <p>Username: { this.props.user ? this.props.user.user_name : null }</p>
                        <p>email: { this.props.user ? this.props.user.email : null }</p>
                        <p>ID: { this.props.user ? this.props.user.id : null }</p>

                        <h4>Available Balance: { this.props.user ? '$' + Math.floor((Math.random() + 1) * 100) + '.00' : null }</h4>
                    </div>
                    <a href='http:///localhost:3005/auth/logout'><button>Logout</button></a>
                    {/* Can use process.env.REACT_APP_LOGOUT but must restart npm start */}
                </div>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        user: state.user
    };
}

let outputActions = {
    getUserInfo
}
export default connect( mapStateToProps, outputActions )( Private );