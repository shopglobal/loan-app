import {Upload, Icon, message} from 'antd';
import React, {Component} from 'react';


function beforeUpload(file) {
  const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png');
  if (!isJPG) {
    alert('上传jpge、jpg、png格式的图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert('图片大小超过2M');
  }
  return isJPG && isLt2M;
}

export default class MyUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: (<Icon type="plus"/>),
    };
  }

  handleChange(info) {
    let file = info.file;
    if (file.status === 'done') {
      this.props.afterUpload(file.response.url);
    }
  }

  render() {
    console.log('render' + this.props.url);

    setTimeout(() => {
      if (this.props.url) {
        this.setState({
          image: (<img src={this.props.url} alt="" style={{
            width: 50,
            height: 50,
          }}/>),
        });
      }
    }, 2000);

    return (
      <Upload
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dashed #d9d9d9',
          borderRadius: 6,
          cursor: 'pointer',
          width: 50,
          height: 50,
        }}
        showUploadList={false}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={(info) => this.handleChange(info)}
      >
        {this.state.image}
      </Upload>
    );
  }
}
