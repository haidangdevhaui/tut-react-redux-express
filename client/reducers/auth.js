import { SET_CURRENT_USER } from '../actions/types';
import { isEmpty } from 'lodash';

const authInitialState = {
    isAutheticated: false,
    user: {}
}

export default (state = authInitialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAutheticated: !isEmpty(action.user),
                user: action.user
            }
        default:
            return state
    }
}