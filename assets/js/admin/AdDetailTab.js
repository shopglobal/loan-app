import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {Radio} from 'antd';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');


export default class AdDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newImage: false,
      imageUrl: undefined,
      location: 0,
      ad: {
        title: "",
        image: "",
        url: "",
        location: 0
      }
    }
  }

  componentWillMount() {
    let id = this.props.params.id;

    if (id != 0) {
      io.socket.get('/ad/' + id, {}, (ad, res) => {

        this.setState({
          imageUrl: ad.image,
          location: ad.location,
          ad: ad,
        });
      })
    }
  }

  save(ad) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/ad', ad);
    } else {
      if (!this.isEmptyObject(ad)) {
        io.socket.patch('/ad/' + id, ad);
      }
    }
  }


  validate() {

    let example =[
      {
        id:'title',
        alertStr:"请输入标题！"
      },
      {
        id:'url',
        alertStr:"广告链接不能为空！"
      }
    ];
    let len = example.length;
    let temp , text;
    let newAd = {};

    //增加新的平台
    if (this.props.params.id == 0) {

      for (let i = 0 ; i < len ; i++){
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text == "") {
          alert(temp.alertStr);
          return;
        }
        newAd[temp.id] = text;
      }

      if (!this.state.newImage) {
        alert("请上传广告图片！");
        return;
      }
      newAd['image'] = this.state.newImage;

      newAd['location'] = this.state.location;
    } else {
      //更新平台数据
      for (let i = 0; i < len; i++) {
        temp = example[i];
        if ((text = document.getElementById(temp.id).value) != "") {
          newAd[temp.id] = text;
        }
      }
      if (this.state.newImage) {
        newAd['image'] = this.state.imageUrl;
      }
      //如果经过选择，最终的结果没变就不更新
      if (this.state.location != this.state.ad.location) {
        newAd['location'] = this.state.location;
      }
    }
    if ('url' in newAd) {
      let url = newAd.url;
      if (!(/^(http)s?:\/\/\w+/.test(url))) {
        alert("广告链接格式不正确，请以“http://”或“https://”开头！");
        return;
      }
    }

    return newAd;
  }

  render() {

    let ad = this.state.ad;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="广告图片">
            <MyUpload
              style={{
                width:200,
                height:100,
              }}
              url={this.state.imageUrl}
              action="/ad/uploadImage"
              afterUpload={(imageUrl) => {
                this.setState({newImage: true, imageUrl: imageUrl})
              }}/>
          </FormItem>
          <FormItem label="标题">
            <MyInput placeholder={ad.title} id="title"/>
          </FormItem>
          <FormItem label="广告链接">
            <MyInput placeholder={ad.url} id="url"/>
          </FormItem>
          <FormItem label="显示位置">
            <Radio.Group onChange={(e) => this.setState({location: e.target.value})} value={this.state.location}>
              <Radio style={radioStyle} value={0}>不显示</Radio>
              <Radio style={radioStyle} value={1}>首页</Radio>
              <Radio style={radioStyle} value={2}>攻略指南</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let label = this.validate();
              if (label) {
                this.save(label);
                browserHistory.push('/admin/ads')
              }
            }}>保存</Button>
          </FormItem>
        </Form>
      </div>);
  }

  isEmptyObject(e) {
    var t;
    for (t in e)
      return !1;
    return !0
  }
}

let radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
