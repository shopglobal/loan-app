import React, {Component} from "react";
import {ListView, Button} from "antd-mobile";
import MyNavBar from './component/MyNavBar';
import Size from './style/Size';

import MyOrderListItem from "./component/MyOrderListItem";
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');

export default class OrderTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasLogin: 0,
      orders: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([]),
    }
  }

  getOrders(userId) {
    io.socket.get('/order/user/' + userId, {}, (orders, res) => {
      this.setState({
        orders: orders,
        dataSource: this.state.dataSource.cloneWithRows(orders),
      });
    });
  }

  componentWillMount() {
    io.socket.get('/user/hasLogin', {}, (user, res) => {
      let hasLogin = 0;
      if (user !== undefined) {
        hasLogin = user.id;
        this.getOrders(user.id);
      }
      this.setState({
        hasLogin: hasLogin,
      });
    });
  }

  render() {

    let Content = () => {
      if (this.state.hasLogin === 0) {
        return (<div style={{
          textDecoration: 'none',
          borderWidth: 0,
          display: this.state.hasLogin === 0 ? undefined : 'none',
          padding: Size.ScreenWidth / 4,
          height: Size.NormalContentHeight-Size.TabBarHeight,
        }}>
          <MyButton link="/login" style={{height: 100}}>登录</MyButton>
        </div>);
      } else {
        return (<ListView
          style={styleListView}
          dataSource={this.state.dataSource}
          renderRow={(order) => <MyOrderListItem key={order.id} data={order}/>}/>);
      }
    };

    return (<div>
      <MyNavBar leftIcon='false' title="订单"/>
      <Content/>
    </div>);
  }
}

let styleListView = {
  borderWidth: 0,
  height: Size.NormalContentHeight-Size.TabBarHeight,
  overflow: 'scroll'
}



