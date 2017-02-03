import React from 'react';
import {Row, Col, Panel, FormGroup, ControlLabel} from 'react-bootstrap';
import style from '../styles/_app.css';
import FormPostStatus from '../components/form/formPostStatus';
import NewContent from '../components/home/newContent';

class AuthLayOut extends React.Component {
    render(){
        return(
            <Row className={style.rowContent}>
                <Col lg={3}>
                    <Panel>
                        Profile
                    </Panel>
                </Col>
                <Col lg={6}>
                    <FormPostStatus></FormPostStatus>
                    <NewContent></NewContent>
                </Col>
                <Col lg={3}>
                    <Panel>
                        Suggest Friendly
                    </Panel>
                </Col>
            </Row>
        )
    }
}

export default AuthLayOut;