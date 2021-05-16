import {
    LOGIN_USER,
    REGISTER_USER
} from '../action/types'

export default function (state = {}, action){
    console.log(action.payload)
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        default:
            return state;
            break;
    }
}