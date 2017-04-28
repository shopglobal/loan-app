import React, {Component} from 'react';
import IconAndText from "./component/IconAndText";
import MyNavBar from "./component/MyNavBar";
import MyButton from "./component/MyButton";
import {Toast} from "antd-mobile";
import Size from './style/Size';
import Color from './style/Color';
import MyInput from "./component/MyInput";
import MyRandom from '../Tools/MyRandom';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');
var jq = require('jquery');

export default class LoginActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasSendMeg: false,
			verificationButtonText: '获取验证码',
			correctPhoneLen: false,
			correctPhone: "",
			tempPhone: "",
			correctVerificationCode: "",
			correctVerificationCodeLen: false,
			tempVerificationCode: "",
		};
	}

	componentWillMount(){

		io.socket.get('/setting' , {} ,(settings , res)=>{
			if(settings[0]!==undefined){
				this.setState({
					setting:settings[0],
				})
			};
		});
	}

	sendVerificationMsg() {
		//首先生成一个验证码，使用io.socket.post去发送验证短信码
		let code = parseInt(MyRandom.generateNum())+"";

		let setting = this.state.setting;
		let msgJson = {
			"account":setting.msgAccount,
			"password":setting.msgPassword,
			"msg": "【"+setting.msgSignature+"】"+setting.msgTemplate+"："+code,
			"phone": this.state.tempPhone
		};

		io.socket.post(setting.msgUrl , msgJson , (data , res)=>{
		  console.log(res);
    });
		/*jq.post(setting.msgUrl , msgJson , (data , status)=>{
		  console.log(data);
		  console.log(status);
    });*/

		//变按钮为不可用，同时改变文字
		this.setState({
			correctVerificationCode:code,
			hasSendMeg: true,
			correctPhone: this.state.tempPhone,
		});
		let i = 5;

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

	render() {
		return (
			<div>
				<MyNavBar>登录</MyNavBar>
				<IconAndText/>
				<MyInput
					onChange={(text) => {
						let correctLen = text.length === 11 ? true : false;
						this.setState({
							correctPhoneLen: correctLen,
							tempPhone: text,
						});
					}}>手机号</MyInput>
				<div
					style={{display: 'flex', backgroundColor: Color.White, alignItems: 'center',}}>
					<MyInput
						onChange={(text) => {
							let correctLen = text.length === 4 ? true : false;
							this.setState({
								correctVerificationCodeLen: correctLen,
								tempVerificationCode: text,
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
					disabled={!(this.state.correctPhoneLen && this.state.correctVerificationCodeLen)}
					onClick={() => {
						if (this.state.tempVerificationCode === this.state.correctVerificationCode
							&& this.state.tempPhone === this.state.correctPhone) {
							browserHistory.goBack();
						} else {
							Toast.show('手机号或验证码错误！');
						}
					}
					}>登录</MyButton>

			</div>
		);
	}


}
