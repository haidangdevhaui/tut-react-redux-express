import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import appStyle from '../styles/_app.css';
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import fontAws from 'font-awesome/css/font-awesome.min.css';

class App extends Component{
    render(){
        return (
            <div className="container">
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>
        )
    }
}

export default App;