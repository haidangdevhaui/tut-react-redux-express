import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addFlashMessage} from '../actions/flashMessage';

export default function(ComposedComponent){
    class Authenticate extends Component {
        
        componentWillMount() {
            const {isAuthenticated} = this.props;
            if(!isAuthenticated){
                this.props.addFlashMessage({
                    type: 'danger',
                    text: 'You need to login for access page'
                });
                this.context.router.push('/login');
            }
        }
        
        render() {
            return (
                <ComposedComponent {...this.props}/>
            );
        }
    }

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            addFlashMessage: state.addFlashMessage
        }
    }

    return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}
