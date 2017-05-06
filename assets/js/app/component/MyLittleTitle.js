import React, {Component} from 'react';
import {Flex} from 'antd-mobile';
import Color from '../style/Color';
import Size from '../style/Size';

export default class MyLittleTitle extends Component {


	render() {
		let style = Object.assign({color: Color.NormalText, fontSize: Size.NormalFontSize}, this.props.color);


		return (
			<div style={{
				display:'flex',
				backgroundColor: Color.White,
				padding: Size.Padding,
				paddingLeft:Size.PagePaddingLeftAndRight,
				paddingRight:Size.PagePaddingLeftAndRight,
				alignItems:'center'
			}}>
				<div style={{paddingRight: 10,fontSize:Size.NormalFontSize}}>|</div>
				<div style={style}>{this.props.children || this.props.title}</div>
			</div>
		);
	}
}
