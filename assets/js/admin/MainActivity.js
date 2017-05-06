import React, {Component} from 'react';
import MyMenu from './component/MyMenu';
import Size from './style/Size';
import Color from './style/Color';
import {browserHistory} from 'react-router';
import MyIcon from "../Tools/MyIcon";
var io = require('../../dependencies/sockets');


export default class MainActivity extends Component {

  componentWillMount() {
    io.socket.get('/user/hasLogin', {}, (user, res) => {
      if (user === undefined) {
        browserHistory.push('/admin/login');
      }
    });
  }

  render() {

    return (
      <div>
        <div style={{
          backgroundColor:Color.Basic,
          height: Size.HeaderHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MyIcon/>
          <h1>后台管理</h1></div>
        <div style={{
          display: 'flex',
        }}>
          <MyMenu />
          <div style={{
            overflow: 'scroll',
            width: Size.ContentWidth,
            height: Size.ContentHeight,
          }}>{this.props.children}</div>

        </div>
      </div>);
  }
}
