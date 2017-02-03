import React, {Component} from 'react';
import {Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import FA from '../../helpers/font-awesome';
import style from '../../styles/_app.css';

class FormPostStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            hiddenText: false,
            hiddenArea: true
        }
    }

    onOpenForm(){
        this.setState({
            hiddenText: true,
            hiddenArea: false
        });
    }

    render() {
        return (
            <Row>
                <Panel bsStyle="success" style={{background: '#E8F5FD'}}>
                    <FormGroup validationState="success">
                        <FormControl type="text" placeholder="What's happening?" style={{display: this.state.hiddenText ? "none" : "block"}} onClick={this.onOpenForm.bind(this)}/>
                        <FormControl componentClass="textarea" placeholder="What's happening?" style={{display: this.state.hiddenArea ? "none" : "block"}}/>
                        <FormControl.Feedback className={style.fixFeedback}>
                            <FA className="camera"></FA>
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup validationState="success" style={{display: this.state.hiddenArea ? "none" : "block"}}>
                        <div className="pull-left">
                            <FA className="camera" size="2x" color="#3071a9"></FA>
                            <FA className="map-marker" size="2x" color="#3071a9"></FA>
                        </div>
                        <div className="pull-right">
                            <Button bsStyle="primary">
                                <FA className="edit"></FA>
                                Post
                            </Button>
                        </div>
                    </FormGroup>
                </Panel>
            </Row>
        );
    }
}

export default FormPostStatus;