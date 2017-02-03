import React, {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import style from '../../styles/_home.css';
import {connect} from 'react-redux';

class MiniProfile extends Component {
    render() {
        const {profile} = this.props;
        return (
            <Row>
                <Panel className={style.panelProfile}>
                    <Row className={style.topPanelProfile}>
                        
                    </Row>
                    <div className={style.panelProfileAvatar}>
                        
                    </div>
                    <Row className={style.botPanelProfile}>
                        <div className={style.nameProfile}>
                            {profile.fullname} <br/>
                            @{profile.username}
                        </div>
                    </Row>
                </Panel>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.user
    }
}

export default connect(mapStateToProps)(MiniProfile);