import { ActionTypes } from '../_actions/types';

function rootReducer(state = {}, action) {
    switch(action.type){
        case ActionTypes.REGISTER_USER:
        case ActionTypes.LOGIN_USER:
            return {...state, user: action.payload.user, token: action.payload.token};
        case ActionTypes.AUTH_USER:
            return {...state, userData: action.payload.userData ? action.payload.userData : {}, isAuth: action.payload.isAuth}
        case ActionTypes.LOGOUT_USER:
            return {...state, userData: {}, isAuth: false}
        default:
            return state;
    }
}

export default rootReducer;