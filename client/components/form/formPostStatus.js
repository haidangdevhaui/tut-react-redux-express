import React, {Component} from 'react';
import {Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import FA from '../../helpers/font-awesome';
import style from '../../styles/_app.css';
import axios from 'axios';
import ListImages from '../form/listImages';
import update from 'react-addons-update';

class FormPostStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUploading: false,
            videos: [],
            images: [],
            post: {
                content: '',
                media: {
                    images: []
                }
            },
        }
    }

    onSelectFile(){
        document.getElementById('images_input').click();
    }

    onUploadImg(e){
        var files = e.target.files;
        var formData = new FormData();
        for(var i = 0; i < files.length; i ++){
            formData.append('images', files[i]);
        }
        axios.defaults.headers.post['Content-Type'] = undefined;
        this.setState({isUploading: true});
        axios.post('api/upload', formData).then(({data}) => {
            this.setState({images: data.response, isUploading: false});
            this.setState({post: update(this.state.post, {media: {images: {$set: data.images}}})});
        });
    }

    onPostStatus(e){
        e.preventDefault();
        axios.post('api/user/status', this.state.post).then(({data}) => {
            this.setState({post: update(this.state.post, {
                content: {$set: ''},
                media: {
                    images: {$set: []}
                }
            }), images: []});
        });
    }

    handleChange(e){
        this.setState({post: update(this.state.post, {[e.target.name]: {$set: e.target.value}})});
    }

    render() {
        return (
            <Row>
                <form onSubmit={this.onPostStatus.bind(this)}>
                <Panel bsStyle="success" style={{background: '#E8F5FD'}}>
                    <FormGroup validationState="success">
                        <FormControl componentClass="textarea" placeholder="What's happening?" value={this.state.post.content} name="content" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup>
                        {this.state.isUploading ? <img src="/static/loading.gif" alt=""/> : ''}
                        {this.state.images.length > 0 ? <ListImages images={this.state.images}/> : ''}
                    </FormGroup>
                    <FormGroup validationState="success">
                        <div className="pull-left">
                            <i className="fa fa-camera fa-2x" style={{color: '#3071a9', cursor:'pointer'}} onClick={this.onSelectFile.bind(this)}></i>
                            <FA className="map-marker" size="2x" color="#3071a9"></FA>
                        </div>
                        <div className="pull-right">
                            <Button bsStyle="primary" type="submit">
                                <FA className="edit"></FA>
                                Post
                            </Button>
                        </div>
                    </FormGroup>
                    <input type="file" name="images[]" id="images_input" onChange={this.onUploadImg.bind(this)} multiple style={{display:'none'}}/>
                </Panel>
                </form>
            </Row>
        );
    }
}

export default FormPostStatus;