import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logOutRequest} from '../actions/authActions';
import {addFlashMessage} from '../actions/flashMessage';
import {ADD_FLASH_MESSAGE} from '../actions/types';

class NavigationBar extends React.Component {

    logOut(e){
        e.preventDefault();
        this.props.logOutRequest().then(
            () => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'GoodBye!'
                });
                this.context.router.push('/');
            }
        );
        
        
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;

        const userLink = (
            <ul className="nav navbar-nav">
                <li>
                    <Link to="profile" activeClassName="active">{user.username}</Link>
                </li>
                <li>
                    <a href="#" onClick={this.logOut.bind(this)}>Logout</a>
                </li>
            </ul>
        );

        const guestLink = (
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
        );

        return (
            <div className="navbar">
                <Link className="navbar-brand" to="/">React with Express Server</Link>
                { isAuthenticated ? userLink : guestLink }
            </div>
        );
    }
    
};

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logOutRequest, addFlashMessage})(NavigationBar);