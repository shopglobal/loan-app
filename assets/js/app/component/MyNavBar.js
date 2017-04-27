import React, {Component} from 'react';
import Size from '../style/Size';
import MyIcon from './MyIcon';
import {Flex} from "antd-mobile";
import Color from '../style/Color';

export default class MyNavBar extends Component {

	render() {

		/*左侧icon默认是显示返回，如果不显示，传false，如果传参就是type*/
		let leftIconType = 'back';
		let leftIcon = this.props.leftIcon;
		let leftOnClick = this.props.onLeftClick;
		if (leftIcon === false || leftIcon === 'false'){
			leftIconType = 'hidden';
			leftOnClick = undefined;
		}else if (leftIcon !== undefined){
			leftIconType = leftIcon;
		}

		/*右侧icon默认是不显示，如果传参就是type*/
		let rightIconType = 'hidden';
		let rightIcon = this.props.rightIcon;
		let rightOnClick = undefined;
		if (rightIcon !== undefined){
			rightIconType = rightIcon;
			rightOnClick = this.props.onRightClick;
		}

		return (
				<div><Flex style={{
					padding:10,
					backgroundColor:Color.NavBarBack,
					height: Size.NavHeight,
				}}>
					<MyIcon type={leftIconType} onClick={leftOnClick}/>
					<Flex.Item>
						<div style={{fontSize: Size.TitleFontSize ,textAlign:'center'}}>{this.props.children || this.props.title}</div>
					</Flex.Item>
					<MyIcon type={rightIconType} onClick={rightOnClick}/></Flex>
				</div>


		);
	}
}