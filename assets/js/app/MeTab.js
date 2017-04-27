import React, {Component} from 'react';
import IconAndText from "./component/IconAndText";
import {List, ActionSheet, Toast, Modal, Popup, Button} from 'antd-mobile';
import Size from './style/Size';
import NormalListItem from './component/NormalListItem';
import MyIcon from "./component/MyIcon";
var io = require('../../dependencies/sockets');

export default class MeTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
		}
	}

	componentWillMount() {

	}

	showServiceTele() {
		Popup.show(<div>
			<div>13102171390</div>
			<Button type="primary" onClick={() => Popup.hide()}>知道了</Button>
		</div>, {animationType: 'slide-up', maskClosable: true});
	};

	showAbout() {
		Popup.show(<div>
			<div>关于我们</div>
			<Button type="primary" onClick={() => Popup.hide()}>知道了</Button>
		</div>, {animationType: 'slide-up', maskClosable: true});
	}

	showLogin() {
		Modal.prompt(
			'登录',
			'输入用户名和密码',
			(login, password) => console.log(`login: ${login}, password: ${password}`),
			'login-password',
		);
	}

	login() {
		this.setState({
			isLogin: true,
		});
	}

	logout() {
		/*io.socket.get('/user/logout', {id: 2, phone: 13456}, (err) => {
			if (!err) {
				this.setState({
					isLogin: false,
				});
			}
		});*/

		this.setState({
			isLogin: false,
		});
	}


	render() {
		return (
			<div>
				<IconAndText icon="images/icon/icon.png" text="aaa" onClick={() => this.setState({
					isLogin: true,
				})}/>
				<List>
					<NormalListItem onClick={() => this.showServiceTele()}>咨询客服</NormalListItem>
					<NormalListItem onClick={() => {
						Toast.show('已清除缓存')
					}}>清除缓存</NormalListItem>
					<NormalListItem onClick={() => this.showAbout()}>关于</NormalListItem>
					<Button style={{textDecoration: 'none',}}
					        onClick={() => {
						        if (this.state.isLogin) {
							        this.login.bind(this);
						        } else {
							        this.logout.bind(this);
						        }
					        }}>{this.state.isLogin ? '退出登录' : '登录'}</Button>
				</List>
			</div>);
	}
}


let styleListItem = {
	height: Size.NormalListItemHeight
}
