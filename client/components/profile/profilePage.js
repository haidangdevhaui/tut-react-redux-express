import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileForm from './profileForm';
import {updateProfileRequest} from '../../actions/authActions';
import {addFlashMessage} from '../../actions/flashMessage';

class ProfilePage extends Component {
    render() {
        const {updateProfileRequest} = this.props;
        return (
            <div className="col-lg-offset-3 col-lg-6">
                <ProfileForm
                    updateProfileRequest={updateProfileRequest}
                    addFlashMessage={addFlashMessage}/>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    updateProfileRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {updateProfileRequest, addFlashMessage})(ProfilePage);