import React, {Component} from 'react';
import { FormGroup, FormControl, Alert, ControlLabel, HelpBlock, Radio, Button } from 'react-bootstrap';
import classnames from 'classnames';
import validatorUser from '../../../server/shared/validations/profile';
import {setCurrentUser} from '../../actions/authActions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

class ProfileForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullname: '',
            age: '',
            gender: '',
            avatar: '',
            errors: {},
            isLoading: false
        }
        this.profileSubmit = this.profileSubmit.bind(this);
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

    profileSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            this.setState({errors: {}, isLoading: false});
            this.props.updateProfileRequest(this.state).then(
                (data) => {
                    if(!data.error){
                        this.props.addFlashMessage({
                            type: 'success',
                            text: data.message,
                            row: false
                        });
                        const token = data.token;
                        if(token){
                            localStorage.setItem('jwtToken', token);
                            setAuthorizationToken(token);
                        }
                    }
                }
            )
        }
    }
    
    componentWillMount() {
        this.setState(this.props.profile);
    }
    
    render() {
        const { errors, message, isLoading } = this.state;

        return (
            <div>
                <form className="" onSubmit={this.profileSubmit}>
                    <h3>Profile</h3>
                    <FormGroup className={classnames({'has-error': errors.fullname})}>
                        <ControlLabel>Fullname</ControlLabel>
                        <FormControl
                            type="text"
                            name="fullname"
                            value={this.state.fullname}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)}
                        />
                        {errors.fullname ? <HelpBlock>{errors.fullname}</HelpBlock> : ''}
                    </FormGroup>
                    <FormGroup className={classnames({'has-error': errors.age})}>
                        <ControlLabel>Age</ControlLabel>
                        <FormControl
                            type="number"
                            name="age"
                            value={this.state.age}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)}
                        />
                        {errors.age && <HelpBlock>{errors.age}</HelpBlock>}
                    </FormGroup>
                    <FormGroup className={classnames({'has-error': errors.gender})}>
                        <ControlLabel>Gender</ControlLabel>
                        <Radio inline 
                            name="gender"
                            value="0"
                            checked={this.state.gender == 0}
                            onClick={this.handleChange.bind(this)}>
                            Famale
                        </Radio>
                        <Radio inline 
                            name="gender"
                            value="1"
                            checked={this.state.gender == 1}
                            onClick={this.handleChange.bind(this)}>
                            Male
                        </Radio>
                        {errors.gender && <HelpBlock>{errors.gender}</HelpBlock>}
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" disabled={isLoading}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default ProfileForm;