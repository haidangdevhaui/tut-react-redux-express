import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from '../actions/types';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function loginRequest(loginData){
    return dispatch => {
        return axios.post('api/auth', loginData).then(
            res => {
                const token = res.data.token;
                if(token){
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(jwt.decode(token)._doc))
                }
                return new Promise((resovle, reject) => {
                    resovle(res.data);
                })
            }
        );
    }
}

export function logOutRequest(){
    return dispatch => {
        return axios.get('api/auth/logout').then(
            res => {
                localStorage.removeItem('jwtToken');
                setAuthorizationToken(false);
                dispatch(setCurrentUser({}))
                return new Promise((resovle, reject) => {
                    return resovle(true)
                })
            }
        );
    }
}

export function updateProfileRequest(userData){
    return dispatch => {
        return axios.post('api/auth/profile', userData).then(
            res => {
                const token = res.data.token;
                if(token){
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(jwt.decode(token)._doc))
                }
                return new Promise((resovle, reject) => {
                    resovle(res.data);
                })
            }
        );
    }
}

export function getProfileRequest(){
    return dispatch => {
        return axios.get('api/auth/user');
    }
}