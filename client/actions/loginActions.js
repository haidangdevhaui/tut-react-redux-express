import axios from 'axios';

export function loginRequest(loginData){
    return dispatch => {
        return axios.post('api/auth', loginData);
    }
}