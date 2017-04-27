import React, {Component} from 'react';
import MyNavBar from "./component/MyNavBar";
import MyPlaceHolder from "./component/MyPlaceHolder";
import MyLittleTitleAndContent from "./component/MyLittleTitleAndContent";
import {Flex, Button, Popup} from 'antd-mobile';
import Size from './style/Size';
import Color from './style/Color';
import MyPicker from "./component/MyPicker";
import PlatformBlock from "./component/PlatformBlock";
import MyIcon from "./component/MyIcon";
import PlatformActivity from "./PlatformActivity";
var io = require('../../dependencies/sockets');
import {browserHistory} from 'react-router';

export default class LoanActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			button: undefined,
			platform: {},
			content: 0,
			money: 0,
			plan: 0
		}

	}

	componentWillMount() {
		console.log(Size.ScreenHeight);

		let f = (platform, res) => {
			this.setState({
				platform: platform,
			});
		}

		io.socket.get('/platform/' + this.props.params.id, {}, (platform, res) => f(platform, res));
	}

	handleOrder() {
		Popup.hide();

		let order = {
			//plan: this.state.plan,
			dateTime: new Date().valueOf(),
			//money: this.state.money,
			user: 1,
			platform: this.state.platform.id
		};

		io.socket.post('/order', order, (order, res) => {

		});
		browserHistory.push('/');
	}

	judgeHasOrder() {
		Popup.show(<div>
			<div>您已经下了订单?</div>
			<Flex>
				<Button type="primary" onClick={() => {Popup.hide();browserHistory.push('/');}}>没有</Button>
				<Button type="primary" onClick={() => this.handleOrder()}>是的</Button>
			</Flex>
		</div>, {animationType: 'slide-up', maskClosable: true});
	}

	render() {

		let Content = ((props) => {
			if (this.state.content === 0) {
				return (
					<PlatformActivity
						data={this.state.platform}
						height={Size.ScreenHeight - Size.NavHeight - Size.PlaceHolderDefaultHeight * 2 - Size.ButtonHeight}/>
				);
			} else {
				return (<iframe src={this.state.platform.url} frameborder="0"
				                width={Size.ScreenWidth}
				                height={Size.ScreenHeight - Size.NavHeight - Size.PlaceHolderDefaultHeight * 2}/>);
			}
		});

		let rightIcon=()=>{
			if(this.state.button===undefined){
				return 'hidden';
			}else {
				return 'close';
			}
		}

		return (
			<div>
				<MyNavBar rightIcon={rightIcon()} onRightClick={() => this.judgeHasOrder()}>贷款平台名称</MyNavBar>
				<Content />
				<Button
					onClick={() => {
						this.setState({
							button: 'none',
							content: 1,
						});

					}}
					style={{
						textDecoration: 'none',
						display: this.state.button,
						height: Size.ButtonHeight,
						width: Size.ButtonWidth,
						backgroundColor: Color.Dodgerblue,
						margin: 'auto'
					}}>立即申请</Button>
				<MyPlaceHolder/>
			</div>);
	}
}
