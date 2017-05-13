import React, {Component} from "react";

import Color from "../style/Color";
import Size from "../style/Size";
import MyRandom from "../../Tools/MyRandom";

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

		let styleInput = Object.assign({
			fontSize:Size.BigFontSize,
			border: '0',
			//textAlign:'right',
			height:Size.InputHeight,
			marginLeft:Size.Padding*2
		},this.props.styleInput);

		let style = Object.assign({
			alignItems: 'center',
			display: 'flex',
			flex: 1,
			backgroundColor: Color.White,
			height: Size.InputItemHeight,
		}, this.props.style);

		return (
			<div style={style}>
				<div
				style={{
					fontSize:Size.BigFontSize
				}}
				>{this.props.children || this.props.title}</div>
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


