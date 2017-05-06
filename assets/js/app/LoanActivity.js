import React, {Component} from "react";
import MyNavBar from "./component/MyNavBar";
import MyPlaceHolder from "./component/MyPlaceHolder";
import {Flex, Popup} from "antd-mobile";
import Size from "./style/Size";
import Color from "./style/Color";
import PlatformActivity from "./PlatformActivity";
import MyButton from "../Tools/MyButton";
import {browserHistory} from "react-router";
var io = require('../../dependencies/sockets');

export default class LoanActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			platform: {
				"id": 1,
				"name": "",
				"logo": "/images/icon/icon.png",
				"slogan": "",
				"applyQuantity": 10000,
				"successQuantity": 50000,
				"grade": 8,
				"fastestTime": "",
				"averageTime": "",
				"condition": "",
				"necessary": "",
				"declaration": "",
				"minLimit": 100,
				"maxLimit": 10000,
				"url": "",
				"plans": [],
				"labels": [],
				"orders": []
			},
			//platformUrl: "",
			content: 0,//页面显示内容，也代表贷款阶段。0代表看平台简介（PlatformActivity），1代表进入贷款平台申请页面
			money: 0,
			plan: 0,
			hasLogin: 0,
		}
		console.log('loan construct');

	}

	componentWillMount() {
		io.socket.get('/platform/' + this.props.params.id, {}, (platform, res) => {
			this.setState({
				platform: platform,
			});
			//this.props.afterGetPlatform(platform.url);
		});

		console.log('loan will mount');
		io.socket.get('/user/hasLogin', {}, (user, res) => {
			let hasLogin = 0;
			if (user !== undefined) {
				hasLogin = user.id;
			}
			this.setState({
				hasLogin: hasLogin,
			});
		});
	}

	handleOrder() {
		Popup.hide();

		let order = {
			//plan: this.state.plan,
			dateTime: new Date().valueOf(),
			//money: this.state.money,
			user: this.state.hasLogin,
			platform: this.state.platform.id
		};

		io.socket.post('/order', order, (order, res) => {

		});
		browserHistory.push('/');
	}

	judgeHasOrder() {
		Popup.show(
			<div>
				<div
					style={{
						fontSize: Size.TitleFontSize,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: Size.ScreenWidth,
						height: 50,
					}}>您已经下了订单?
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: Size.Padding * 2
					}}>
					<MyButton onClick={() => {
						Popup.hide();
						browserHistory.push('/');
					}}>没有</MyButton>
					<div
						style={{width: 30}}></div>
					<MyButton type="primary" onClick={() => this.handleOrder()}>是的</MyButton>
				</div>
			</div>, {animationType: 'slide-up', maskClosable: true});
	}

	render() {

		let Content = () => {
			if (this.state.content === 0) {
				return (
					<PlatformActivity
						data={this.state.platform}/>
				);
			} else {
				return (<iframe src={this.state.platform.url} frameborder="0"
				                width={Size.ScreenWidth}
				                height={Size.ScreenHeight - Size.NavHeight - Size.PlaceHolderDefaultHeight * 4}/>);
			}
		};

		let rightIcon = () => {
			if (this.state.content === 0) {
				return 'hidden';
			} else {
				return 'close';
			}
		}

		return (
			<div>
				<MyNavBar
					onLeftClick={() => browserHistory.goBack()}
					rightIcon={rightIcon()} onRightClick={() => this.judgeHasOrder()}/>
				<Content/>
				<MyPlaceHolder/>
				<MyButton
					onClick={() => {
						if (this.state.hasLogin === 0) {
							browserHistory.push('/login');
							return;
						}
						this.setState({
							content: 1,
						});
					}}
					disabled={this.state.hasLogin !== 0 && this.state.platform.url.length === 0}
					style={{
						display: this.state.content === 0 ? 'flex' : 'none',
						backgroundColor: Color.Dodgerblue,
						marginLeft: Size.PagePaddingLeftAndRight,
						marginRight: Size.PagePaddingLeftAndRight,
						height: Size.ButtonHeight,
					}}>{this.state.hasLogin === 0 ? '立即登录' : '立即申请'}</MyButton>
				<MyPlaceHolder/>
			</div>);
	}
}
