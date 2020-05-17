import axios from 'axios';
import { ActionTypes } from './types';
import { API } from '../utils/config.js';

export function registerUser(dataToSubmit){
    const payload = axios.post(API.REGISTER_USER_URL, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: ActionTypes.REGISTER_USER,
        payload: payload
    }
}

export function loginUser(dataToSubmit){
    const payload = axios.post(API.LOGIN_USER_URL, dataToSubmit)
                .then(response => response.data);

    return {
        type: ActionTypes.LOGIN_USER,
        payload: payload
    }
}

export function auth(){
    const payload = axios.get(API.AUTH_USER_URL)
    .then(response => response.data);

    return {
        type: ActionTypes.AUTH_USER,
        payload: payload
    }
}

export function logoutUser(){
    const payload = axios.get(API.LOGOUT_USER_URL)
    .then(response => response.data);

    return {
        type: ActionTypes.LOGOUT_USER,
        payload: payload
    }
}