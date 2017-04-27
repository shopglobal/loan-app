import React, {Component} from 'react';
import MyNavBar from "./component/MyNavBar";
import MyPlaceHolder from "./component/MyPlaceHolder";
import MyLittleTitleAndContent from "./component/MyLittleTitleAndContent";
import {InputItem, Button, Flex} from 'antd-mobile';
import Size from './style/Size';
import Color from './style/Color';
import MyPicker from "./component/MyPicker";
import PlatformBlock from "./component/PlatformBlock";
import MyIcon from "./component/MyIcon";
import MyInput from "./component/MyInput";
import NormalListItem from "./component/NormalListItem";

export default class PlatformActivity extends Component {

	render() {

		let platform = this.props.data;
		this.state = {
			money: platform.minLimit,
		}
		let header = () => {
			return <div style={{
				padding: Size.Padding * 2,
				backgroundColor: Color.White,
				display: 'flex',
				alignItems: 'center'
			}}>
				<MyIcon size="big"/>
				<div style={{marginLeft: Size.Padding * 2,}}>
					<div style={{fontSize: Size.NormalFontSize}}>{platform.name}</div>
					<div style={{height: 5}}></div>
					<div style={{display: 'flex'}}>
						<div >{platform.successQuantity}人申请成功</div>
						<div style={{width: 80}}></div>
						<div >综合评分:{platform.grade}</div>
					</div>
				</div>

			</div>
		}

		let extra = platform.minLimit+'-'+platform.maxLimit+'元';


		return (
			<div style={{
				overflow: 'auto',
				height: this.props.height
			}}>
				{header()}
				<MyPlaceHolder/>
				<NormalListItem extra={extra} rightIcon="none" leftIcon="none">贷款金额</NormalListItem>
				<MyPicker
					data={this.formatPlan(platform.plans)}
					cols="1">分期期限</MyPicker>
				<div style={{
					padding: Size.Padding,
					display: 'flex', justifyContent: 'center'
				}}>
					<PlatformBlock title="最快放款时间">{platform.fastestTime}</PlatformBlock>
					<PlatformBlock title="平均放款时间">{platform.averageTime}</PlatformBlock>
				</div>
				<MyLittleTitleAndContent title="申请条件">
					{platform.condition}</MyLittleTitleAndContent>
				<MyPlaceHolder/>
				<MyLittleTitleAndContent title="所需资料">
					{platform.necessary}
				</MyLittleTitleAndContent>
				<MyPlaceHolder/>
				<MyLittleTitleAndContent title="详细说明">
					{platform.declaration}
				</MyLittleTitleAndContent>
				<MyPlaceHolder/>
			</div>);
	}

	formatPlan(plans) {
		if (plans === undefined || plans.length === 0) {
			return [];
		}
		let formatPlans = [];
		plans.map((plan) => {
			formatPlans.push({
				label: plan.time,
				value: plan.id,
			});
		});
		return formatPlans;
	}
}