import React, {Component} from "react";
import IconAndText from "./component/IconAndText";
import {List, Popup, Toast} from "antd-mobile";
import Size from "./style/Size";
import NormalListItem from "./component/NormalListItem";
import {browserHistory} from "react-router";
import MyButton from "../Tools/MyButton";
import MyPlaceHolder from "./component/MyPlaceHolder";
var io = require('../../dependencies/sockets');

export default class MeTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasLogin: false,
			user: undefined,
			setting: {
				serviceTele: "",
				about:""
			},
		}
	}

	componentWillMount() {
		if (!this.state.hasLogin) {
			io.socket.get('/user/hasLogin', {}, (user, res) => {
				if (user !== undefined) {
					this.setState({
						hasLogin: true,
						user: user,
					});
				}
			})
		}
		io.socket.get('/setting', {}, (settings, res) => {
			this.setState({
				setting: settings[0]
			});
		});
	}

	showServiceTele() {
		Popup.show(<div>
			<div
				style={{
					padding:Size.PagePaddingLeftAndRight,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: Size.BigFontSize,
				}}
			>{this.state.setting.serviceTele}</div>
			<MyButton
				style={{
					margin:Size.PagePaddingLeftAndRight,
				}}
				onClick={() => Popup.hide()}>知道了</MyButton>
		</div>, {animationType: 'slide-up', maskClosable: true});
	};

	showAbout() {
		Popup.show(<div>
			<div
				style={{
					padding:Size.PagePaddingLeftAndRight,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: Size.BigFontSize,
				}}
			>{this.state.setting.about}</div>
			<MyButton
				style={{
					margin:Size.PagePaddingLeftAndRight,
				}}
				onClick={() => Popup.hide()}>知道了</MyButton>
		</div>, {animationType: 'slide-up', maskClosable: true});
	}

	loginOrLogout() {
		if (this.state.hasLogin) {
			let user = this.state.user;
			io.socket.get('/user/logout', {id: user.id, phone: user.phone}, (msg, res) => {
				if (msg === "OK") {
					this.setState({
						hasLogin: false,
						user: undefined,
					});
				}
			});
		} else {
			browserHistory.push('/login');
		}
	}

	render() {
		return (
			<div>
				<div
					style={{
						height: 20
					}}></div>
				<IconAndText icon="images/icon/icon.png" text={this.state.user ? this.state.user.phone : "登录"}
				             onClick={() => this.loginOrLogout()}/>
				<div
					style={{
						height: 15
					}}></div>
				<List>
					<NormalListItem leftIcon="kefu" onClick={() => this.showServiceTele()}>咨询客服</NormalListItem>
					<NormalListItem leftIcon="clean" onClick={() => {
						Toast.show('已清除缓存');
					}}>清除缓存</NormalListItem>
					<NormalListItem leftIcon="about" onClick={() => this.showAbout()}>关于</NormalListItem>

				</List>
				<MyPlaceHolder/>

				<MyButton style={{
					height: 50,
					textDecoration: 'none',
					margin: Size.Padding * 3
				}}
				          onClick={() => this.loginOrLogout()}
				>{this.state.hasLogin ? '退出登录' : '登录'}</MyButton>
			</div>);
	}
}


let styleListItem = {
	height: Size.NormalListItemHeight
}
