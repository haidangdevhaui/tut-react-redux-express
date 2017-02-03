import React, {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import style from '../../styles/_app.css';
import {connect} from 'react-redux';
import AuthLayOut from '../../layouts/_auth';
import GuestLayOut from '../../layouts/_guest';

class HomePage extends Component {
    render() {
        const {isAuthenticated} = this.props.auth;
        
        return (
            isAuthenticated ? <AuthLayOut></AuthLayOut> : <GuestLayOut></GuestLayOut>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(HomePage);