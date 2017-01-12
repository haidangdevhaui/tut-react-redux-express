import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';

class FlashMessage extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {
        const { id, type, text } = this.props.message;
        return (
            <div className="row">
                <Alert bsStyle={type} key={id}>
                    <button className="close" onClick={this.onClick}><span>&times;</span></button>
                    {text}
                </Alert>
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;