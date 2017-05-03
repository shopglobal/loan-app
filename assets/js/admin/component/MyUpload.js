import {Upload, Icon, message} from 'antd';
import React, {Component} from 'react';


function beforeUpload(file) {
  const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png');
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default class MyUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.imageUrl,
    }
  }

  handleChange(info) {
    let file = info.file;
    if (file.status === 'done') {
      this.setState({url:file.response.url});
      this.props.afterUpload(file.response.url);
    }
  }

  render() {
    return (
      <Upload
        style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          border: '1px dashed #d9d9d9',
          borderRadius: 6,
          cursor: 'pointer',
          width: 50,
          height: 50,
        }}
        showUploadList={false}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={(info)=>this.handleChange(info)}
      >
        {
          this.state.url ?
            <img src={this.state.url} alt="" style={{
              width: 50,
              height: 50,
            }}/> :
            <Icon type="plus"/>
        }
      </Upload>
    );
  }
}
