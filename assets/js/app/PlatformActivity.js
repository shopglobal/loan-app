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
var io = require('../../dependencies/sockets');

export default class PlatformActivity extends Component {

  constructor(props){
    super(props);
    this.state ={
      //初始化platform，完全是为了初始化
      platform:{
        "id": 1,
        "name": "",
        "logo": "/images/icon/icon.png",
        "slogan": "",
        "applyQuantity": 10000,
        "successQuantity": 50000,
        "grade": 8,
        "fastestTime": "",
        "averageTime": "",
        "condition": "",
        "necessary": "",
        "declaration": "",
        "minLimit": 100,
        "maxLimit": 10000,
        "url": "",
        "plans": [],
        "labels": [     ],
        "orders": []
      },
    }
    console.log('platform construct');
  }

  componentWillMount(){
    console.log('platform will mount');

  }

	render() {

		let platform = this.props.data;
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
        height:Size.ScreenHeight - Size.NavHeight - Size.PlaceHolderDefaultHeight * 2 - Size.ButtonHeight
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
