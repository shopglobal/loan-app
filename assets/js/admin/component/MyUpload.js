import {Upload, Icon, message} from 'antd';
import React, {Component} from 'react';
import MyIcon from "../../Tools/MyIcon";


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

  componentWillReceiveProps(props) {
    let url = props.url;
    if (url !== undefined) {
      setTimeout(() => {
        this.setState({
          image: (<MyIcon type={url} src={url} alt="" style={Object.assign({width: 50, height: 50,}, props.style)}/>),
        });
      }, 2000);
    }
  }

  render() {

    let style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px dashed #d9d9d9',
      borderRadius: 6,
      cursor: 'pointer',
      width: 50,
      height: 50,
    };

    style = Object.assign(style, this.props.style);

    return (
      <Upload
        style={style}
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
