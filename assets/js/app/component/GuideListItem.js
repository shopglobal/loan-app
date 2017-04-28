import React, {Component} from 'react';
import {Flex} from "antd-mobile";
import MyIcon from './MyIcon';

import Color from '../style/Color';
import styleListItem from '../style/styleListItem';
import styleLitteText from '../style/styleLittleText';
import MyLink from "./MyLink";

export default class GuideListItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let guide = this.props.data;
		return (

			<div onClick={this.props.onClick} style={styleListItem}>
				<MyLink to={guide.link}>
					<Flex>
						<MyIcon size="big" src={guide.icon}/>
						<Flex.Item>
							<div style={styleTitle}>{guide.title}</div>
							<div style={styleLitteText}>{guide.subtitle}</div>
						</Flex.Item>
						<div>1000人阅读</div>
					</Flex></MyLink>
			</div>

		);
	}

}


let styleTitle = {
	fontSize: 20
}

