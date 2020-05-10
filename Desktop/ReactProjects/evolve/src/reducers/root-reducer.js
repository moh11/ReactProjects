import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case REGISTER_USER:
        case LOGIN_USER:
        case AUTH_USER:
        case LOGOUT_USER:
        default:
            return state;
    }
}