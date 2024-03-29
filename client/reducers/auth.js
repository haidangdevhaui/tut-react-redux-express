import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/types';
import { isEmpty } from 'lodash';

const authInitialState = {
    isAuthenticated: false,
    user: {}
}

export default (state = authInitialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            }
        default:
            return state
    }
}