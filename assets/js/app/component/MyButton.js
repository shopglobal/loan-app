import React, {Component} from 'react';

import Size from '../../Tools/Size';
import Color from '../../Tools/Color';
import MyLink from "../../Tools/MyLink";
import {Button} from "antd-mobile";

export default class MyButton extends Component {

	render() {

		let styleButton = {
		  display:'flex',
			textDecoration: 'none',
			color: Color.Font,
			lineHeight: 'normal',
			padding: Size.Padding,
			height: 'auto',
			width: 'auto',
			fontSize:Size.NormalFontSize,
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
