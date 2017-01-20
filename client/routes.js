import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Home from './pages/Home';

import SignUpPage from './components/signup/SignUpPage';
import LoginPage from './components/login/loginPage';
import ProfilePage from './components/profile/profilePage';
import CalendarPage from './components/calendar/calendarPage';

import requireAuth from './utils/requireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/signup" component={SignUpPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/profile" component={requireAuth(ProfilePage)}/>
        <Route path="/calendar" component={requireAuth(CalendarPage)}/>
    </Route>
)