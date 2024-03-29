import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import RootRouter from './routes';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';

import { setCurrentUser } from './actions/authActions';
import jwt from 'jsonwebtoken';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    
)

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)._doc));
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={RootRouter}/>
    </Provider>
, document.getElementById('app'))