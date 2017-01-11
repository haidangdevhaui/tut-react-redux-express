import React, {Component} from 'react';
import {Alert, Button, Form, Label, InputGroup, FormControl, ControlLabel, FormGroup, HelpBlock} from 'react-bootstrap';
import classnames from 'classnames';
import validatorUser from '../../../server/shared/validations/signup';
import { browserHistory } from 'react-router';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            errors: {},
            message: '',
            isLoading: false
        }
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value});
    }

    isValid(){
        const { errors, isValid } = validatorUser(this.state);

        if(!isValid){
            this.setState({ errors });
        }

        return isValid;
    }

    signUpSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            this.setState({errors: {}, isLoading: true});
            this.props.SignUpRequest(this.state).then(
                ({data}) => {
                    if(!data.isValid){
                        return this.setState({errors: data.errors, isLoading: false})
                    }
                    if(data.success){
                        this.context.router.push('/');
                        return this.setState({message: data.message, isLoading: false})
                    }
                }
            );
        }
    }

    render() {
        const { errors, message, isLoading } = this.state;
        return (
            <div>
                <form className="" onSubmit={this.signUpSubmit.bind(this)}>
                    <h3>Sign up now!</h3>
                    {message && <Alert bsStyle="success">{message}</Alert>}
                    <FormGroup className={classnames({'has-error': errors.email})}>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)}
                        />
                        {errors.email ? <HelpBlock>{errors.email}</HelpBlock> : ''}
                    </FormGroup>
                    <FormGroup className={classnames({'has-error': errors.username})}>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)}
                        />
                        {errors.username && <HelpBlock>{errors.username}</HelpBlock>}
                    </FormGroup>
                    <FormGroup className={classnames({'has-error': errors.password})}>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter password"
                            onChange={this.handleChange.bind(this)}
                        />
                        {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" disabled={isLoading}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

SignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignUpForm;