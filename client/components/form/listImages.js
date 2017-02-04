import React, {Component} from 'react';
import shortid from 'shortid';

class ListImages extends Component {
    render() {
        const lists = this.props.images.map((item) => <img key={shortid.generate()} src={item.src} style={{width: '90px', height: '90px', borderRadius: '2px', background: '#FFF', margin: '2px'}}/>);
        return (
            <div>
                {lists}
            </div>
        );
    }
}

export default ListImages;