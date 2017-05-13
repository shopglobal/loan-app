import React, {Component} from "react";
import {TabBar} from "antd-mobile";

import HomeTab from "./HomeTab";
import OrderTab from "./OrderTab";
import MeTab from "./MeTab";
import LabelTab from "./LabelTab";

import Color from './style/Color';
import Size from "./style/Size";
var io = require('../../dependencies/sockets');
require('./style/styleTabBar.css');


export default class MainActivity extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedTab: homeTabKey,
      verified: true
    };
  }

  componentWillMount() {
    io.socket.get('/setting', {}, (settings, res) => {
      this.setState({verified: settings[0].verified});
    });
  }

  render() {
    return (
      <TabBar
        className
        unselectedTintColor="#949494"
        tintColor={Color.Basic}
      >
        <TabBar.Item
          title="首页"
          key={homeTabKey}
          icon={{uri: 'images/icon/home.png'}}
          selectedIcon={{uri: 'images/icon/home_selected.png'}}
          selected={this.state.selectedTab === homeTabKey}
          onPress={() => {
            this.setState({
              selectedTab: homeTabKey,
            });
          }}
        >
          {this.state.verified ?
            <HomeTab/> :
            <iframe
              frameborder="0"
              width={Size.ScreenWidth}
              height={Size.ScreenHeight - Size.TabBarHeight}
              src="https://m.rong360.com/article/"/>
          }
        </TabBar.Item>

        <TabBar.Item
          icon={{uri: 'images/icon/discovery.png'}}
          selectedIcon={{uri: 'images/icon/discovery_selected.png'}}
          title="发现"
          key={labelTabKey}
          selected={this.state.selectedTab === labelTabKey}
          onPress={() => {
            this.setState({
              selectedTab: labelTabKey,
            });
          }}
        >
          {this.state.verified ?
            <LabelTab flag="main"/> :
            <iframe
              frameborder="0"
              width={Size.ScreenWidth}
              height={Size.ScreenHeight - Size.TabBarHeight}
              src="https://m.rong360.com/licai/"/>
          }
        </TabBar.Item>

        <TabBar.Item
          icon={{uri: 'images/icon/order.png'}}
          selectedIcon={{uri: 'images/icon/order_selected.png'}}
          title={this.state.verified ? "订单" : "工具"}
          key={orderTabKey}
          selected={this.state.selectedTab === orderTabKey}
          onPress={() => {
            this.setState({
              selectedTab: orderTabKey,
            });
          }}
        >
          {this.state.verified ?
            <OrderTab/> :
            <iframe
              frameborder="0"
              width={Size.ScreenWidth}
              height={Size.ScreenHeight - Size.TabBarHeight}
              src="https://m.rong360.com/calculator/"/>}
        </TabBar.Item>


        <TabBar.Item
          icon={{uri: 'images/icon/me.png'}}
          selectedIcon={{uri: 'images/icon/me_selected.png'}}
          title="我的"
          key={meTabKey}
          selected={this.state.selectedTab === meTabKey}
          onPress={() => {
            this.setState({
              selectedTab: meTabKey,
            });
          }}
        >
          <MeTab/>
        </TabBar.Item>
      </TabBar>
    );
  }
}

let homeTabKey = 'homeTab';
let labelTabKey = 'labelTab';
let orderTabKey = 'orderTab';
let meTabKey = 'meTab';
