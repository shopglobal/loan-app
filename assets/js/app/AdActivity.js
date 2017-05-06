import React, {Component} from "react";
import {browserHistory} from "react-router";
import MyNavBar from "./component/MyNavBar";

import Size from "./style/Size";
import MyPlaceHolder from "./component/MyPlaceHolder";
var io = require('../../dependencies/sockets');

export default class AdActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ad: {
				title: "",
				url: "",
			}
		}
	}

	componentWillMount() {
		io.socket.get('/ad/' + this.props.params.id, {}, (ad, res) => {
			this.setState({
				ad: ad,
			});
		});
	}

	render() {

		return (
			<div>
				<MyNavBar onLeftClick={() => browserHistory.goBack()}>{this.state.ad.title}</MyNavBar>
				<iframe src={this.state.ad.url}
				        frameborder="0"
				        width={Size.ScreenWidth}
				        height={Size.ScreenHeight - Size.NavHeight - Size.PlaceHolderDefaultHeight}/>
				<MyPlaceHolder/>

			</div>);
	}
}
