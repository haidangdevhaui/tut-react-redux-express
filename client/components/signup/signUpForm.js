import React, {Component} from 'react';
import {Alert, Button, Form, Label, InputGroup, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import axios from 'axios';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value});
    }

    signUpSubmit(e){
        e.preventDefault();
        this.props.SignUpRequest(this.state);
    }

    render() {
        return (
            <div>
                <form className="" onSubmit={this.signUpSubmit.bind(this)}>
                    <h3>Sign up now!</h3>
                    <FormGroup >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)}
                        />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)}
                        />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter password"
                            onChange={this.handleChange.bind(this)}
                        />
                    </FormGroup>
                    <Button type="submit" bsStyle="primary">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignUpForm;