import React, {Component} from 'react';
import GuideListItem from "./component/GuideListItem";
import {Carousel , List} from 'antd-mobile';

import Size from './style/Size';
import MyNavBar from "./component/MyNavBar";
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');

export default class GuideActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			guides: [],
      ads:[],
		};
	}

	componentWillMount() {

    io.socket.get('/ad/location/2' , {} , (ads , res)=>{
      this.setState({
        ads:ads,
      });
    });

		io.socket.get('/guide', {}, (guides, res) => {
      this.setState({
        guides: guides,
      });
    });

	}

  readGuide(guide){
    let newGuide = {
      readQuantity:guide.readQuantity+1,
    };
    io.socket.patch('/guide/'+guide.id , newGuide ,(guide , res)=>{});
    browserHistory.push(guide.link);
  }

	render() {

		let GuideList = this.state.guides.map((guide) => {
			return <GuideListItem key={guide.id} data={guide} onClick={(guide)=>this.readGuide(guide)}/>
		});

    let AdCarousel = this.state.ads.map((ad)=>{
      return <img key={ad.id} style={styleAd} src={ad.image} alt={ad.title} onClick={()=>browserHistory.push('/ad/'+ad.id)}/>
    });


		return (
			<div>
				<MyNavBar onLeftClick={()=>browserHistory.goBack()}>攻略指导</MyNavBar>
				<Carousel
          style={styleAd}
					autoplay={true}
					infinite>
          {AdCarousel}
				</Carousel>

				<List>
					{GuideList}
				</List>
			</div>
		);
	}


}

let styleAd = {
	height: Size.AdHeight
}
