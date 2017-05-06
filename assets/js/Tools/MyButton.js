import React, {Component} from 'react';

import Size from '../app/style/Size';
import Color from '../app/style/Color';
import MyLink from "./MyLink";
import {Button} from "antd-mobile";

export default class MyButton extends Component {

	render() {

		let styleButton = {
		  display:'flex',
			textDecoration: 'none',
			color: Color.Font,
			lineHeight: 'normal',
			padding: Size.Padding*2,
			height: 'auto',
			width: 'auto',
			fontSize:Size.BigFontSize,
		};
		styleButton = Object.assign(styleButton, this.props.style);

		let style = {
			textDecoration: 'none',
			color: Color.Font,
		};
		style = Object.assign(style, this.props.style);

		return (
			<MyLink to={this.props.link}
			        style={style}>
				<Button
					disabled={this.props.disabled}
					style={styleButton}
					onClick={this.props.onClick}>

					<div style={{margin:'auto'}}>{this.props.children}</div>
				</Button></MyLink>

		);
	}

}
