import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileForm from './profileForm';
import {updateProfileRequest, getProfileRequest} from '../../actions/authActions';
import {addFlashMessage} from '../../actions/flashMessage';

class ProfilePage extends Component {
    render() {
        const {updateProfileRequest, getProfileRequest, profile, addFlashMessage} = this.props;
        return (
            <div className="col-lg-offset-3 col-lg-6">
                <ProfileForm
                    updateProfileRequest={updateProfileRequest}
                    getProfileRequest={getProfileRequest}
                    addFlashMessage={addFlashMessage}
                    profile={profile}/>
            </div>
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