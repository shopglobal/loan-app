import React, {Component} from 'react';
import {Picker} from "antd-mobile";

import Color from '../style/Color';
import Size from '../style/Size';
import MyIcon from "../../Tools/MyIcon";
import TextListItem from "./TextListItem";
import MyRandom from '../../Tools/MyRandom';

export default class MyInput extends Component {

	constructor(props){
		super(props);
		this.state = {
			id:MyRandom.generateString(),
		}
	}

	inputDefaultBlur() {
		let blur = this.props.onBlur;
		if (blur !== undefined) {
			let text = document.getElementById(this.state.id).value;
			this.props.onBlur(text);
		}
	}

	inputDefaultChange() {
		let change = this.props.onChange;
		if (change !== undefined) {
			let text = document.getElementById(this.state.id).value;
			this.props.onChange(text);
		}
	}

	render() {

		let styleInput = {
			//border: '1',
			//textAlign:'right',
			width: 'auto',
		};

		let style = Object.assign({
			alignItems: 'center',
			display: 'flex',
			flex: 1,
			backgroundColor: Color.White,
			height: Size.NormalListItemHeight,
		}, this.props.style);

		return (
			<div style={style}>
				<div>{this.props.children || this.props.title}</div>
				<input
					style={styleInput} type={this.props.type}
					id={this.state.id}
					onBlur={() => this.inputDefaultBlur()}
					onChange={() => this.inputDefaultChange()}/>
				<div>{this.props.extra}</div>
			</div>
		);
	}
}


