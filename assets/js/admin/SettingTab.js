import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {Radio , message} from 'antd';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');


export default class SettingTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      setting: {
        "serviceTele": "",
        "msgSignature": "",
        "msgTemplate": "",
        "msgAccount": "",
        "msgPassword": "",
        "msgUrl": ""
      }
    }
  }

  componentWillMount() {

    io.socket.get('/setting', {}, (settings, res) => {
      this.setState({
        setting: settings[0]
      });
    })

  }

  save(setting) {
    if (!this.isEmptyObject(setting)) {
      io.socket.patch('/setting/' + this.state.setting.id, setting);
    }
    message.info("保存成功")
  }


  validate() {

    let example = [
      "serviceTele",
      "msgSignature",
      "msgTemplate",
      "msgAccount",
      "msgPassword",
    ];
    let newSetting = {};
    let len = example.length;

    for (let i = 0; i < len; i++) {
      let id = example[i];
      let text = document.getElementById(id).value;
      if (text != "") {
        newSetting[id] = text;
      }
    }

    return newSetting;
  }

  render() {

    let setting = this.state.setting;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="客户服务电话">
            <MyInput placeholder={setting.serviceTele} id="serviceTele"/>
          </FormItem>
          <FormItem label="短信验证url">
            <MyInput placeholder={setting.msgUrl} id="msgUrl"/>
          </FormItem>
          <FormItem label="短信验证账号">
            <MyInput placeholder={setting.msgAccount} id="msgAccount"/>
          </FormItem>
          <FormItem label="短信验证密码">
            <MyInput placeholder={setting.msgPassword} id="msgPassword"/>
          </FormItem>
          <FormItem label="验证短信签名">
            <MyInput placeholder={setting.msgSignature} id="msgSignature"/>
          </FormItem>
          <FormItem label="验证短信模板">
            <MyInput placeholder={setting.msgTemplate} id="msgTemplate"/>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={() => this.save(this.validate())}>保存</Button>
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
