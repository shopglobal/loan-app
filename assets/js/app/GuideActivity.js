import React, {Component} from 'react';
import GuideListItem from "./component/GuideListItem";
import {Carousel , List} from 'antd-mobile';
import MyLink from './component/MyLink';

import Size from './style/Size';
import MyNavBar from "./component/MyNavBar";

var io = require('../../dependencies/sockets');

export default class GuideActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			guides: []
		};
	}

	componentWillMount() {
		let f = (guides, res) => {
			this.setState({
				guides: guides,
			});
		};

		io.socket.get('/guide', {}, (guides, res) => f(guides, res));

	}

	render() {

		let GuideList = this.state.guides.map((guide) => {
			return <GuideListItem key={guide.id} data={guide}/>
		});


		return (
			<div>
				<MyNavBar>攻略指导</MyNavBar>
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

				<List>
					{GuideList}
				</List>
			</div>
		);
	}


}

let styleCarousel = {
	height: Size.AdHeight
}
