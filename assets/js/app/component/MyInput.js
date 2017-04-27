import React, {Component} from 'react';
import {Picker} from "antd-mobile";

import Color from '../style/Color';
import Size from '../style/Size';
import MyIcon from "./MyIcon";
import TextListItem from "./TextListItem";

export default class MyInput extends Component {

	constructor(props) {
		super(props);
		this.state={
			textValue: this.props.defaultValue,
		};
	}

	render() {
		let styleInput = {
			border: '2',
			textAlign:'right',
		};

		return (
			<div style={{
				display: 'flex',
				backgroundColor: Color.White,
				height:Size.NormalListItemHeight,
			}}>
				<div>{this.props.title}</div>
				<input
					style={styleInput} type={this.props.type}
					id="input"
					defaultValue={this.props.defaultValue}
					onBlur={() => {
						let text = document.getElementById('input').value;
						this.setState({
							textValue: text
						});
						this.props.onBlur(text);
					}}/>
				<div>{this.props.extra}</div>
			</div>
		);
	}
}
