import React, {Component} from 'react';

class FontAwesome extends Component {
    render() {
        let strClass = "fa fa-fw fa-" + this.props.className;
        this.props.spin ? strClass += ' fa-spin ' : '';
        this.props.size ? strClass += ' fa-' + this.props.size : '';
        return (
            <i
                className={strClass}
                style={{color: this.props.color ? this.props.color : ''}}
            >
            </i>
        );
    }
}

export default FontAwesome;