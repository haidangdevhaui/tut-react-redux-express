import React, {Component} from 'react';
import LoginForm from './loginForm';
import { loginRequest } from '../../actions/loginActions';
import { addFlashMessage } from '../../actions/flashMessage';
import { connect } from 'react-redux';

class LoginPage extends Component {
    render() {
        const { loginRequest } = this.props;
        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6">
                    <LoginForm loginRequest={loginRequest} addFlashMessage={this.props.addFlashMessage}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginRequest: state.loginRequest
    }
}

export default connect(mapStateToProps, { loginRequest, addFlashMessage })(LoginPage);