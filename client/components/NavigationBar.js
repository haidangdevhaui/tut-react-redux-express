import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logOutRequest} from '../actions/authActions';
import {addFlashMessage} from '../actions/flashMessage';
import {ADD_FLASH_MESSAGE} from '../actions/types';
import FA from '../helpers/font-awesome';
import style from '../styles/_navigation.css';
import {Col, Navbar, Row, Modal, Button} from 'react-bootstrap';
import axios from 'axios';

class NavigationBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false
        }
    }
    
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
        )
    }

    onClosePostModal(){
        this.setState({showModal: false});
    }

    onOpenPostModal(){
        this.setState({showModal: true});
    }

    onUploadImg(e){
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append('images', file);
        formData.append('file_path', e.target.value);
        axios.defaults.headers.post['Content-Type'] = undefined;
        axios.post('api/upload', formData).then((response) => {
            console.log(response);
        });
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;
        const postModal = (
            <Modal show={this.state.showModal} onHide={this.onClosePostModal.bind(this)}>
                <Modal.Header>
                    <Modal.Title className="text-center">Compose new status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" name="images" onChange={this.onUploadImg.bind(this)} multiple/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onClosePostModal.bind(this)}>Close</Button>
                </Modal.Footer>
             </Modal>
        );
        const userLink = (
            <div>
            <Navbar.Collapse>
                <ul className="nav navbar-nav">
                    <li><Link to="/"><FA className="home"></FA>Home</Link></li>
                    <li><a href="#"><FA className="bell"></FA>Notifications</a></li>
                    <li><a href="#"><FA className="envelope"></FA>Messages</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            (avatar)
                            <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="profile" activeClassName="active">
                                    {user.username}<br/>
                                    <span className={style.textSub}>view profile</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={this.logOut.bind(this)}>
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className={style.postBtn + ' btn btn-primary'} onClick={this.onOpenPostModal.bind(this)}>
                            <FA className="edit"></FA>Post
                        </a>
                    </li>
                </ul>
                <form className="navbar-form navbar-right" role="search">
                    <div className="form-group">
                        <input type="text" className={style.navSearch + ' form-control'} placeholder="Search"/>
                    </div>
                </form>
            </Navbar.Collapse>
            {postModal}
            </div>
        );

        const guestLink = (
            <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                    <li><Link to="/"><FA className="home"></FA>Home</Link></li>
                    <li><a href="#"><FA className="globe"></FA>Introduce</a></li>
                </ul>
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
            </div>
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
                    </div>
                    {isAuthenticated ? userLink : guestLink}
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