import React, {Component} from 'react';
import shortid from 'shortid';

class ListImages extends Component {
    render() {
        const lists = this.props.images.map((item) => <img key={shortid.generate()} src={item.url} style={{width: '100px', height: '100px', borderRadius: '2px', background: '#FFF', margin: '2px'}}/>);
        return (
            <div>
                {lists}
            </div>
        );
    }
}

export default ListImages;