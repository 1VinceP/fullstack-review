import { createStore, applyMiddleware } from 'redux';
import userReducer from './ducks/user-reducer';
import promiseMiddleware from 'redux-promise-middleware'


export default createStore( userReducer, {}, applyMiddleware( promiseMiddleware() ) );