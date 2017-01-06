import React from 'react';
import {Link} from 'react-router';

const NavigationBar = () => {
    return (
        <div className="navbar">
            <a className="navbar-brand" href="#">React with Express Server</a>
            <ul className="nav navbar-nav">
                <li className="active">
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/signin">Signin</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;