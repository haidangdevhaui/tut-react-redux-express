import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileForm from './profileForm';
import {updateProfileRequest, getProfileRequest} from '../../actions/authActions';
import {addFlashMessage} from '../../actions/flashMessage';
import {Col} from 'react-bootstrap';

class ProfilePage extends Component {
    render() {
        
        const {updateProfileRequest, getProfileRequest, profile, addFlashMessage} = this.props;
        return (
            <Col>
                Profile page
            </Col>
        );
    }
}

ProfilePage.propTypes = {
    updateProfileRequest: React.PropTypes.func.isRequired,
    getProfileRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.user
    }
}

export default connect(mapStateToProps, {updateProfileRequest, addFlashMessage, getProfileRequest})(ProfilePage);