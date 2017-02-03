import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import style from '../styles/_app.css';
import {connect} from 'react-redux';

class App extends Component{
    render(){
        return (
            <div className="app-main">
                <NavigationBar />
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(App);