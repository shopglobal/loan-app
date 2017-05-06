import React, {Component} from 'react';
import {NavBar, List} from "antd-mobile";
import {browserHistory} from 'react-router';
import NormalListItem from "./component/NormalListItem";
import MyPlaceHolder from "./component/MyPlaceHolder";
import MyNavBar from './component/MyNavBar';
var io = require('../../dependencies/sockets');

import Size from './style/Size';

export default class LabelTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			labels: [],
		};

	}

	componentWillMount() {
		let f = (labels, res) => {
			this.setState({
				labels: labels,
			});
		}

		io.socket.get('/label/show', {}, (labels, res) => f(labels, res));
	}


	render() {
		//初始化页面基本样式
		//flag代表是从贷款大全按钮点进来，即通过路由进来，还是通过tabbar进入，即在主页
		let flag = this.props.flag;
		if (flag === 'main') {
			var placeHolderHeight = Size.TabBarHeight + Size.PlaceHolderDefaultHeight;
			var leftVisibility = false;
		}

		//初始化列表
		let labelList = this.state.labels.map((label) => {
			let link = '/platforms/label/' + label.id;
			return <NormalListItem key={label.id} leftIcon={label.icon} link={link}>{label.name}</NormalListItem>
		});

		return (
			<div>
				<MyNavBar leftIcon={leftVisibility} onLeftClick={() => browserHistory.push('/')}>
					贷款大全
				</MyNavBar>
				<List>
					<NormalListItem leftIcon="/images/labelIcon/allPlatform.png" link="/platforms/label/0">所有平台</NormalListItem>
					<MyPlaceHolder/>
					{labelList}
				</List>
				<MyPlaceHolder height={placeHolderHeight}/>
			</div>
		);

	}
}
