import React, {Component} from "react";
import {ListView, Button} from "antd-mobile";
import MyNavBar from './component/MyNavBar';
import Size from './style/Size';

import MyOrderListItem from "./component/MyOrderListItem";
import MyButton from "./component/MyButton";
var io = require('../../dependencies/sockets');

export default class OrderTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasLogin: false,
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}).cloneWithRows([]),
		}
	}

	componentWillMount() {

		if (!this.state.hasLogin) {
			io.socket.get('/user/hasLogin', {}, (user, res) => {
				if(user !== undefined){
					getOrders(user.id)
					this.setState({
						hasLogin:true,
					});
				}
			})
		}

		let getOrders = (userId) => {

			io.socket.get('/order/user/'+userId , {} , (orders , res)=>{
				this.setState({
					orders:orders,
					dataSource:this.state.dataSource.cloneWithRows(orders),
				});
			});
		}
	}

	render() {
		return (<div>
			<MyNavBar leftIcon='false' title="订单"/>
			<div style={{
				textDecoration:'none',
				display: this.state.hasLogin,
				padding: Size.ScreenWidth / 4,
			}}>
				<MyButton link="/login">登录</MyButton>
			</div>
			<ListView
				style={styleListView}
				dataSource={this.state.dataSource}
				renderRow={(order) => <MyOrderListItem data={order}/>}/>
		</div>);
	}
}

let styleListView = {
	height: document.documentElement.clientHeight - Size.NavHeight - Size.TabBarHeight,
	overflow: 'scroll'
}



