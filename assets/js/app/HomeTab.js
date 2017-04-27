import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Carousel, Flex} from 'antd-mobile';
import MyPlaceHolder from "./component/MyPlaceHolder";
import HomeLoanMoneySquare from "./component/HomeLoanMoneySquare";
import LittleTitle from "./component/MyLittleTitle";
import MyLink from "./component/MyLink";
var io = require('../../dependencies/sockets');
import Size from './style/Size';
import Color from './style/Color';

import IconAndText from './component/IconAndText'
import {List} from 'antd-mobile';
import PlatformListItem from './component/PlatformListItem';

export default class HomeTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			platforms: []
		};
		console.log('hometab construct');
	}

	componentWillMount() {
		let f = (platforms, res) => {
			this.setState({
				platforms: platforms,
			});
		};

		io.socket.get('/platform/label/热门', {}, (platforms, res) => f(platforms, res));
		console.log('hometab will mount');

	}

	render() {
		//console.log('homeTab');
		let HotList = this.state.platforms.map((platform) => {
			let link = "/loan/"+platform.id;
			return <PlatformListItem key={platform.id} data={platform} link={link}/>
		});
		return (
			<div>
				<Carousel
					autoplay={true}
					infinite>
					<MyLink link="/ad"><img src={'images/icon/icon.png'} style={styleCarousel}/></MyLink>
					<img src={'images/icon/icon.png'}/>
					<img src={'images/icon/icon.png'}/>
					<img src={'images/icon/icon.png'}/>
					<img src={'images/icon/icon.png'}/>
					<img src={'images/icon/icon.png'}/>

				</Carousel>

				<Flex style={{padding:Size.Padding,backgroundColor:Color.White}}>
					<Flex.Item><IconAndText icon="images/icon/icon.png" text="贷款大全" link="/label"/> </Flex.Item>
					<Flex.Item><IconAndText icon="images/icon/icon.png" text="身价测算" link="/question"/> </Flex.Item>
					<Flex.Item><IconAndText icon="images/icon/icon.png" text="攻略" link="/ad"/> </Flex.Item>
				</Flex>
				<LittleTitle title="热门贷款金额"/>

				<Flex style={{padding:Size.Padding,backgroundColor:Color.White}}>
					<Flex.Item><HomeLoanMoneySquare/></Flex.Item>
					<Flex.Item><HomeLoanMoneySquare/></Flex.Item>
					<Flex.Item><HomeLoanMoneySquare/></Flex.Item>
					<Flex.Item><HomeLoanMoneySquare/></Flex.Item>
				</Flex>

				<MyPlaceHolder/>
				<LittleTitle>热门贷款平台</LittleTitle>
				<List>
					{HotList}
				</List>
				<MyPlaceHolder height={Size.TabBarHeight}/>

			</div>

		);
	}
}

let styleCarousel = {
	height: Size.AdHeight
}
