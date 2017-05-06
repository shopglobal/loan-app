import React, {Component} from 'react';
import Size from '../style/Size';
import Color from '../style/Color';

import {Flex} from 'antd-mobile';
import MyLink from "../../Tools/MyLink";

export default class HomeLoanMoneySquare extends Component {

	render() {

		let moneySquare = (money) => {
			return (
				<Flex>
					<div style={{
						fontSize: Size.SmallFontSize,
						color: Color.White,
					}}>{money}</div>
					<div style={{
						fontSize: Size.LittleFontSize,
						color: Color.White,
					}}>元
					</div>
				</Flex>
			);
		};

		let min = this.props.min;
		let max = this.props.max;
		if (min == '0') {
			var square = (
				<div>
					{moneySquare(max)}
					<div style={styleText}>以下</div>
				</div>);
		}
		else if (max == '100000') {
			var square = (
				<div>
					{moneySquare(min)}
					<div style={styleText}>以上</div>
				</div>);
		} else {
			var square = (
				<div>
					{moneySquare(min)}
					<div
						style={{
							textAlign: 'center',
							fontSize: Size.SmallFontSize
						}}>~
					</div>
					{moneySquare(max)}
				</div>);
		}


		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: Size.SquareHeight,
				width: Size.SquareWidth,
				backgroundColor: Color.Square,
			}}>
				<MyLink to={this.props.link}>
					{square}</MyLink>
			</div>
		);
	}
}

let styleText = {
	fontSize: Size.SmallFontSize,
	color: Color.White,
	textAlign: 'center',
};
