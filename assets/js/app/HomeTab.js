import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Carousel, Flex} from 'antd-mobile';
import MyPlaceHolder from "./component/MyPlaceHolder";
import HomeLoanMoneySquare from "./component/HomeLoanMoneySquare";
import LittleTitle from "./component/MyLittleTitle";
import MyLink from "../Tools/MyLink";
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
      platforms: [],
      ads:[],
    };
  }

  componentWillMount() {

    io.socket.get('/ad/location/1' , {} , (ads , res)=>{
      this.setState({
        ads:ads,
      });
    });

    io.socket.get('/platform/label/热门', {}, (platforms, res) => {
      this.setState({
        platforms: platforms,
      });
    });
  }

  render() {
    let HotList = this.state.platforms.map((platform) => {
      let link = "/loan/" + platform.id;
      return <PlatformListItem key={platform.id} data={platform} link={link}/>
    });

    let AdCarousel = this.state.ads.map((ad)=>{
      return <img key={ad.id} style={styleAd} src={ad.image} alt={ad.title} onClick={()=>browserHistory.push('/ad/'+ad.id)}/>
    });
    return (
      <div>
        <Carousel
          style={styleAd}
          autoplay={true}
          infinite>
          {AdCarousel}
        </Carousel>

        <Flex style={{padding: Size.Padding, backgroundColor: Color.White}}>
          <Flex.Item><IconAndText icon="images/icon/icon.png" text="贷款大全" link="/label"/> </Flex.Item>
          <Flex.Item><IconAndText icon="images/icon/icon.png" text="身价测算" link="/worthtest"/> </Flex.Item>
          <Flex.Item><IconAndText icon="images/icon/icon.png" text="攻略" link="/guide"/> </Flex.Item>
        </Flex>
        <LittleTitle title="热门贷款金额"/>

        <Flex style={{padding: Size.Padding, backgroundColor: Color.White}}>
          <Flex.Item><HomeLoanMoneySquare link="/platforms/money/0/2000"/></Flex.Item>
          <Flex.Item><HomeLoanMoneySquare link="/platforms/money/2000/5000"/></Flex.Item>
          <Flex.Item><HomeLoanMoneySquare link="/platforms/money/5000/10000"/></Flex.Item>
          <Flex.Item><HomeLoanMoneySquare link="/platforms/money/10000/100000"/></Flex.Item>
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

let styleAd = {
  height: Size.AdHeight
}
