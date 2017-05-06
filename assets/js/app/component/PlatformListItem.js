import React, {Component} from 'react';
import {Flex} from "antd-mobile";
import MyIcon from '../../Tools/MyIcon';

import Size from '../style/Size';
import Color from '../style/Color';
import styleListItem from '../style/styleListItem';
import MyLink from "../../Tools/MyLink";

export default class PlatformListItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let platform = this.props.data;
		return (

			<div onClick={this.props.onClick} style={styleListItem}>
				<MyLink to={this.props.link}>
					<Flex>
						<MyIcon size="big" src={platform.logo}/>
						<Flex.Item>
							<div style={styleTitle}>{platform.name}</div>
							<div style={styleLittleText}>{platform.slogan}</div>
							<Flex>
								<div style={styleLittleText}>申请人数</div>
								<div style={styleLittleTextRed}>{platform.applyQuantity}</div>
								<div style={{width: 10}}></div>
								<div style={styleLittleText}>利率</div>
								<div style={styleLittleTextRed}>{platform.rate}起</div>
							</Flex>
						</Flex.Item>
						<MyIcon type="right"/>
					</Flex></MyLink>
			</div>

		);
	}

}

let styleLittleText ={
	fontSize:Size.SmallFontSize,
	color:Color.LittleText,
	paddingTop:Size.Padding,
	paddingBottom:Size.Padding,
}

let styleLittleTextRed ={
	paddingLeft:Size.Padding,
	fontSize:Size.SmallFontSize,
	color:Color.LittleText,
	paddingTop:Size.Padding,
	paddingBottom:Size.Padding,
	color: Color.Basic,
}


let styleTitle = {
	fontSize: Size.BigFontSize,
	paddingTop:Size.Padding,
	paddingBottom:Size.Padding,
}

