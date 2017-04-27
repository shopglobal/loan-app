import React, {Component}from 'react';
import {Flex} from 'antd-mobile';
import MyIcon from './MyIcon';
import MyLink from './MyLink';
import styleListItem from '../style/styleListItem';


import Color from '../style/Color';
import Size from '../style/Size';

export default class NormalListItem extends Component {

	render() {
		let size = this.props.size;
		let fontSize = Size.NormalFontSize;
		if (size === undefined) {
			size = 'normal';
		} else if (size === 'big') {
			fontSize = Size.BigFontSize;
		} else if (size === 'small') {
			fontSize = Size.SmallFontSize;
		}


		let rightIcon = this.props.rightIcon;
		if (rightIcon === undefined) {
			rightIcon = 'right';
		}


		return (

			<div onClick={this.props.onClick} style={styleListItem}>
				<MyLink to={this.props.link}>
					<Flex>
						<MyIcon type={this.props.leftIcon} size={size}/>
						<div style={{fontSize:fontSize , flex:1}}>{this.props.children}</div>
						<div style={{fontSize:fontSize}}>{this.props.extra}</div>
						<MyIcon type={this.props.rightIcon} size={size}/>
					</Flex>
				</MyLink>
			</div>
		);

	}

}

