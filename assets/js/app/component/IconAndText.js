import React, {Component} from 'react';
import MyLink from '../../Tools/MyLink';

import Color from '../style/Color';
import Size from '../style/Size';

export default class IconAndText extends Component {

	render() {
		return (
			<div style={{padding:Size.Padding}} onClick={this.props.onClick}>
				<MyLink to={this.props.link}>
					<img src={this.props.icon} alt={this.props.text} style={styleIcon}></img>
					<div style={{height: 5}}></div>
					<div style={styleText}>{this.props.text}</div>
				</MyLink>
			</div>
		);
	}
}

let styleIcon = {
	margin: 'auto',
	width: Size.LogoSize,
	height: Size.LogoSize
}

let styleText = {
	textAlign: 'center',
	fontSize: Size.SmallFontSize
}
