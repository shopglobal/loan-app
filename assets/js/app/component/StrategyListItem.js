import React, {Component} from "react";
import {Flex} from "antd-mobile";
import MyIcon from "../../Tools/MyIcon";

import Size from "../style/Size";
import styleListItem from "../style/styleListItem";
import styleLitteText from "../style/styleLittleText";
import MyLink from "../../Tools/MyLink";

export default class StrategyListItem extends Component {

	render() {
		let strategy = this.props.data;
		return (

			<div onClick={()=>this.props.onClick(strategy)} style={styleListItem}>
				<MyLink to={this.props.link}>
					<Flex>
						<MyIcon size="big" src={strategy.icon}/>
						<Flex.Item>
							<div style={styleTitle}>{strategy.title}</div>
							<div style={styleLitteText}>{new Date(strategy.updatedAt).toLocaleDateString()}</div>
						</Flex.Item>
						<div
							style={{
								fontSize:Size.NormalFontSize
							}}>{strategy.readQuantity}人阅读</div>
					</Flex></MyLink>
			</div>

		);
	}

}


let styleTitle = {
	fontSize: 20
}

