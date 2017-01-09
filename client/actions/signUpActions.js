import axios from 'axios';

export function SignUpRequest(userData){
    return dispatch => {
        return axios.post('api/user', userData);
    }
}