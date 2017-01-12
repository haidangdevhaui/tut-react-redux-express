import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';

class FlashMessage extends Component {
    render() {
        const { id, type, text } = this.props.message;
        return (
            <div className="row">
                <Alert bsStyle={type} key={id}>
                    {text}
                </Alert>
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired
};

export default FlashMessage;