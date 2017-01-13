import React from 'react';
import {Link} from 'react-router';

const NavigationBar = () => {
    return (
        <div className="navbar">
            <Link className="navbar-brand" to="/">React with Express Server</Link>
            <ul className="nav navbar-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="signup" activeClassName="active">Signup</Link>
                </li>
                <li>
                    <Link to="login" activeClassName="active">Login</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;