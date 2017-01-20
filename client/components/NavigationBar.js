import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logOutRequest} from '../actions/authActions';
import {addFlashMessage} from '../actions/flashMessage';
import {ADD_FLASH_MESSAGE} from '../actions/types';
import FA from '../helpers/font-awesome';

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
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        (avatar)
                        {user.username}
                        <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="profile" activeClassName="active">
                                <FA className="user"></FA>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="calendar" activeClassName="active">
                                <FA className="calendar"></FA>
                                Calendar
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={this.logOut.bind(this)}>
                                <FA className="sign-out"></FA>
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        );

        const guestLink = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="signup" activeClassName="active">
                        <FA className="user-plus"></FA>
                        Signup
                    </Link>
                </li>
                <li>
                    <Link to="login" activeClassName="active">
                        <FA className="sign-in"></FA>
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <div className="app-nav">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">App Title</Link>
                    </div>
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="#">Link</a></li>
                            <li><a href="#">Link</a></li>
                        </ul>
                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                        { isAuthenticated ? userLink : guestLink }
                    </div>
                </nav>
            </div>
        );
    }
    
};

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logOutRequest, addFlashMessage})(NavigationBar);