import React, {Component} from "react";
import Color from "../style/Color";
import Size from "../style/Size";
import MyLittleTitle from "./MyLittleTitle";

export default class MyLittleTitleAndContent extends Component {


	render() {


		return (
			<div style={{backgroundColor: Color.White}}>
				<MyLittleTitle color={Color.LittleText}>{this.props.title}</MyLittleTitle>
				<div style={{
					marginLeft: Size.Padding * 2,
					marginRight: Size.Padding * 2,
					borderTopStyle: 'solid',
					borderTopColor: Color.Border,
				}}></div>
				<div style={{
					fontSize:Size.NormalFontSize,
					paddingTop:Size.Padding,
					paddingLeft: Size.Padding * 4,
					paddingRight: Size.Padding * 2,
					paddingBottom: Size.Padding * 2,
				}}>
					{this.props.children || this.props.content}</div>
			</div>
		);
	}
}
