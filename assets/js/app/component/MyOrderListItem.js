import React, {Component} from 'react';
import Size from '../style/Size';
import Color from '../style/Color';
import MyIcon from './MyIcon';
import MyLink from './MyLink';
import {Flex} from 'antd-mobile';
import styleListItem from '../style/styleListItem';
import styleLitteText from '../style/styleLittleText';

export default class MyOrderListItem extends Component {


	render() {


		return (
			<div style={styleListItem} onClick={this.props.onClick}>
				<MyLink to={this.props.link}>
					<Flex>

						<MyIcon size="big"/>
						<Flex.Item>
							<div>
								<Flex>
									<div style={{fontSize:Size.NormalFontSize}}>曹操贷</div><div style={{width:10}}></div><div style={styleLitteText}>-未到账</div>
								</Flex>
								<Flex>
									<div style={styleLitteText}>借款金额:</div><div style={styleLitteText}>10000</div>
									<div style={{width:10}}></div>
									<div style={styleLitteText}>借款期数:</div><div style={styleLitteText}>30天</div>
								</Flex>
							</div>
						</Flex.Item>
						<MyIcon type="right"/>
					</Flex></MyLink>
			</div>
		);
	}
}
