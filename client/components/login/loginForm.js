import React, {Component} from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert } from 'react-bootstrap';
import classnames from 'classnames';
import validatorUser from '../../../server/shared/validations/login';

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    isValid(){
        const { errors, isValid } = validatorUser(this.state);

        if(!isValid){
            this.setState({ errors, isLoading: false });
        }

        return isValid;
    }

    loginSubmit(e){
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        if(this.isValid()){
            this.props.loginRequest(this.state).then(
                ({data}) => {
                    if(data.error){
                        return this.setState({ message: data.message, isLoading: false });
                    }
                    if(!data.error){
                        this.props.addFlashMessage({
                            type: 'success',
                            text: data.message
                        });
                        this.context.router.push('/');
                    }
                }
            );
        }
    }

    render() {
        const { errors, isLoading, message } = this.state;
        return (
            <div>
                <form onSubmit={this.loginSubmit}>
                    <h3>Login</h3>
                    { message ? <Alert bsStyle="danger">{message}</Alert> : '' }
                    <FormGroup className={classnames({'has-error': errors.email})}>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        {errors.email ? <HelpBlock>{errors.email}</HelpBlock> : ''}
                    </FormGroup>
                    <FormGroup className={classnames({'has-error': errors.password})}>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        {errors.password ? <HelpBlock>{errors.password}</HelpBlock> : ''}
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" disabled={isLoading}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default LoginForm;