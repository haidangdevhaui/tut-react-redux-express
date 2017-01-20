import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import '../styles/_app.css';

class App extends Component{
    render(){
        return (
            <div className="app-main">
                <NavigationBar />
                <div className="row">
                    <div className="col-lg-10">
                        <FlashMessagesList />
                        {this.props.children}
                    </div>
                    <div className="col-lg-2" style={{borderLeft: '1px solid #ccc'}}>
                        CHAT Component
                    </div>
                </div>
            </div>
        )
    }
}

export default App;