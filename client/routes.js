import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/home/homePage';

import SignUpPage from './components/signup/SignUpPage';
import LoginPage from './components/login/loginPage';
import ProfilePage from './components/profile/profilePage';

import requireAuth from './utils/requireAuth';

export default (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/*" component={ProfilePage}/>
        </Route>
    </Route>
)