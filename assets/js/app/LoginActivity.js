import React, {Component} from "react";
import IconAndText from "./component/IconAndText";
import MyNavBar from "./component/MyNavBar";
import MyButton from "../Tools/MyButton";
import {Toast} from "antd-mobile";
import Color from "./style/Color";
import MyInput from "./component/MyInput";
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');


export default class LoginActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasSendMeg: false,
      verificationButtonText: '获取验证码',
      correctPhoneLen: false,
      phone: "",
      verificationCode: "",
      correctVerificationCodeLen: false,
    };
  }

  verifyPhone(){
    return (/^1[3|5|7|8][\d]{9}$/.test(this.state.phone));
  }

  sendVerificationMsg() {

    if(! this.verifyPhone()){
      Toast.show('请输入正确手机号！');
      return;
    }

    io.socket.get('/user/verification/'+this.state.phone,{}, (data, res) => {});

    //变按钮为不可用，同时改变文字
    this.setState({
      hasSendMeg: true,
    });
    let i = 60;

    let intervalCode = setInterval(
      () => {
        if (i > 0) {
          this.setState({
            verificationButtonText: i + 's',
          });
          i--;
        } else {
          clearInterval(intervalCode);
          this.setState({
            hasSendMeg: false,
            verificationButtonText: '获取验证码',
          });
        }
      }, 1000);
  }

  login() {

    /*测试注释掉了
    if(! this.verifyPhone()){
      Toast.show('请输入正确手机号！');
      return;
    }*/

    let loginInfo = {
      phone:this.state.phone,
      verificationCode:this.state.verificationCode,
    };
    io.socket.post('/user/login' , loginInfo , (user , res)=>{
      if(user !== undefined){
        //Toast.show('success');
        browserHistory.goBack();
      }else {
        Toast.show('账号或验证码错误！');
      }
    });
  }

  render() {
    return (
      <div>
        <MyNavBar onLeftClick={()=>browserHistory.goBack()}>登录</MyNavBar>
        <IconAndText/>
        <MyInput
          onChange={(text) => {
            let correctLen = text.length === 11 ? true : false;
            this.setState({
              correctPhoneLen: correctLen,
              phone: text,
            });
          }}>手机号</MyInput>
        <div
          style={{display: 'flex', backgroundColor: Color.White, alignItems: 'center',}}>
          <MyInput
            onChange={(text) => {
              let correctLen = text.length === 4 ? true : false;
              this.setState({
                correctVerificationCodeLen: correctLen,
                verificationCode: text,
              });
            }}>验证码</MyInput>
          <MyButton
            disabled={!(this.state.correctPhoneLen && !this.state.hasSendMeg)}
            onClick={() => this.sendVerificationMsg()}
            style={{
              width: 130,
              fontSize: 20,
            }}>
            {this.state.verificationButtonText}</MyButton></div>
        <MyButton
          /*测试注释掉了
          disabled={!(this.state.correctPhoneLen && this.state.correctVerificationCodeLen)}*/
          onClick={() => {this.login()}}>
          登录</MyButton>

      </div>
    );
  }


}
