import React, {Component}from 'react';
import {Flex} from 'antd-mobile';
import MyIcon from '../../Tools/MyIcon';
import Size from '../style/Size';
import MyLink from '../../Tools/MyLink';
import styleListItem from '../style/styleListItem';


import Color from '../style/Color';

export default class TextListItem extends Component {

	render() {
		if (this.props.rightIcon === false || this.props.rightIcon === 'false') {
			var rightIcon = 'none';
		}
		return (

			<div
				onClick={this.props.onClick}
				style={{
					backgroundColor: Color.White,
					display: 'flex',
					padding: Size.Padding * 2,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<div style={{
					fontSize: Size.NormalFontSize,
					flex: 1,
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}>{this.props.title}</div>
				<div style={{
					textAlign: 'right',
					fontSize: Size.NormalFontSize,
					color: Color.LittleText,
				}}>{this.props.children || this.props.content}</div>
				<MyIcon display={rightIcon} type="right"/>
			</div>
		);

	}

}
