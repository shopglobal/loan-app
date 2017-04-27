import React, {Component} from 'react';
import MyPicker from "./component/MyPicker";
var io = require('../../dependencies/sockets');
import {NavBar} from "antd-mobile";

import {browserHistory} from 'react-router';
import {Icon, Popup, List, Picker, ListView} from "antd-mobile";
import PlatformListItem from "./component/PlatformListItem";
import MyNavBar from './component/MyNavBar';

import Size from './style/Size';
import MyPlaceHolder from "./component/MyPlaceHolder";
import MyIcon from "./component/MyIcon";

export default class AdActivity extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}


	render() {

		return (
			<div>
				<MyNavBar onLeftClick={() => alert('leftClick')} rightIcon='filter'
				          onRightClick={() => alert('rightClick')}>贷款平台</MyNavBar>
				<iframe src="/platform/1"></iframe>

			</div>);
	}
}
