import React, {Component} from 'react';
import {Form, Button} from 'antd';
import MyInput from './component/MyInput';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');
var md5 = require('js-md5');


export default class LoginActivity extends Component {

  login() {

    let username = document.getElementById('username').value;
    if (username == "") {
      alert('请输入用户名！');
      return;
    }
    let password = document.getElementById('password').value;
    if (password == "") {
      alert('请输入密码！');
      return;
    }

    io.socket.post('/user/adminLogin', {username: username, password: md5(password)}, (user, res) => {
      if (user !== undefined) {
        //Toast.show('success');
        browserHistory.goBack();
      } else {
        alert('账号或验证码错误！');
      }
    });
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Form layout='horizontal'
              style={{
                textAlign: 'center'
              }}>
          <div
            style={{
              fontSize: 50,
              padding: 20
            }}>管理员登录
          </div>
          <Form.Item label="用户名">
            <MyInput id="username"/>
          </Form.Item>
          <Form.Item label="密码">
            <MyInput id="password" type="password"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" onClick={() => {
              this.login()
            }}>登录</Button>
          </Form.Item>
        </Form>
      </div>);
  }
}
