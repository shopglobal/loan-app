import React, {Component} from 'react';
import Size from '../style/Size';
import Color from '../style/Color';
import MyIcon from '../../Tools/MyIcon';
import MyLink from '../../Tools/MyLink';
import {Flex} from 'antd-mobile';
import styleListItem from '../style/styleListItem';
import styleLitteText from '../style/styleLittleText';
import {browserHistory} from 'react-router';

export default class MyOrderListItem extends Component {


	render() {
		let order = this.props.data;

		return (
			<div style={styleListItem} onClick={this.props.onClick}>
				<MyLink to={this.props.link}>
					<Flex>

						<MyIcon size="big"/>
						<Flex.Item>
							<div>
								<Flex>
									<div style={{fontSize: Size.NormalFontSize}}>{order.platform.name}</div>
									<div style={{width: 10}}></div>
									{/*<div style={styleLitteText}>-未到账</div>*/}
								</Flex>
								<Flex>
                  <div style={styleLitteText}>{order.platform.slogan}</div>
                  <div style={{width: 10}}></div>
                  <div style={styleLitteText}>{new Date(order.dateTime).toLocaleDateString()}</div>
									{/*<div style={styleLitteText}>借款金额:</div>
									<div style={styleLitteText}>10000</div>
									<div style={{width: 10}}></div>
									<div style={styleLitteText}>借款期数:</div>
									<div style={styleLitteText}>30天</div>*/}
								</Flex>
							</div>
						</Flex.Item>
						<MyIcon type="again" onClick={()=>browserHistory.push('/loan/'+order.platform.id)}/>
					</Flex></MyLink>
			</div>
		);
	}
}
