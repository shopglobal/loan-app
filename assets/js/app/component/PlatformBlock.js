import React, {Component} from 'react';

import Color from '../style/Color';
import Size from '../style/Size';

export default class PlatformBlock extends Component {

	render() {

		return (
			<div
				style={{
					padding: Size.Padding*2,
					margin:Size.Padding,
					textAlign: 'center',
					backgroundColor: Color.White,
					flex:'1',
				}}>
				<div style={{
					fontSize: Size.SmallFontSize,
					color: Color.LittleText,
				}}>
					{this.props.title}</div>
				<div style={{height:5}}></div>
				<div style={{
					fontSize: Size.TitleFontSize,
					color: Color.Dodgerblue,
				}}>
					{this.props.children || this.props.content}</div>
			</div>
		);
	}
}
