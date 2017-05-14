import React, {Component} from "react";
import {Picker} from "antd-mobile";

import Color from "../style/Color";
import Size from "../style/Size";
import MyIcon from "../../Tools/MyIcon";

require('../style/styleMyPicker.css');

export default class MyPicker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pickerValue: [],
		}
	}

	render() {

		const PickerChildren = props => (
			<div
				onClick={props.onClick}
				style={{
					height: Size.PickerHeight,
					backgroundColor: Color.White,
					display: 'flex',
					padding: Size.Padding,
					paddingLeft:Size.PagePaddingLeftAndRight,
					paddingRight:Size.PagePaddingLeftAndRight,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<div style={{
					fontSize: Size.NormalFontSize,
					flex: 1,
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}>{props.children}</div>
				<div style={{
					textAlign: 'right',
					fontSize: Size.NormalFontSize,
					color: Color.LittleText,
				}}>{props.extra}</div>
				<MyIcon type="right"/>
			</div>
		);
		let cascade = true;
		if (this.props.cols > 1) {
			cascade = false;
		}

		return (
			<Picker
				cascade={cascade}
				cols={this.props.cols}
				data={this.props.data}
				extra='请选择'
				value={this.state.pickerValue}
				onChange={(v) => {
					if (v[0] === 0 && v[1] == '0-1000000') {
						v = [];
					}
					this.setState({
						pickerValue: v,
					});
					let f = this.props.onChange;
					if (f !== undefined) {
						this.props.onChange(v)
					}
				}}
			>
				<PickerChildren>{this.props.children || this.props.title}</PickerChildren>
			</Picker>
		);
	}
}
