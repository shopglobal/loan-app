import React, {Component} from 'react';
import {Flex} from "antd-mobile";
import MyIcon from '../../Tools/MyIcon';

import Color from '../style/Color';
import styleListItem from '../style/styleListItem';
import styleLitteText from '../style/styleLittleText';
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
							<div style={styleLitteText}>{platform.slogan}</div>
							<Flex>
								<div style={styleLitteText}>申请人数</div>
								<div style={styleLitteText}>{platform.applyQuantity}</div>
								<div style={{width:10}}></div>
								<div style={styleLitteText}>利率</div>
								<div style={styleLitteText}>0.45</div>
							</Flex>
						</Flex.Item>
						<MyIcon type="right"/>
					</Flex></MyLink>
			</div>

		);
	}

}


let styleTitle = {
	fontSize: 20
}

