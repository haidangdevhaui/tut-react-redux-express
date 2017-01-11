import React from 'react';
import SignUpForm from './signUpForm';
import { connect } from 'react-redux';
import { SignUpRequest } from '../../actions/signUpActions';
import { addFlashMessage } from '../../actions/flashMessage';


class SignUpPage extends React.Component{
    render(){
        const {SignUpRequest, addFlashMessage} = this.props;
        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6">
                    <SignUpForm SignUpRequest={SignUpRequest} addFlashMessage={addFlashMessage}/>
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    SignUpRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {SignUpRequest, addFlashMessage})(SignUpPage);