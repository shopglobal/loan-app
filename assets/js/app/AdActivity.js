import React, {Component} from 'react';
import MyPicker from "./component/MyPicker";
var io = require('../../dependencies/sockets');
import {NavBar} from "antd-mobile";

import {browserHistory} from 'react-router';
import {Icon, Popup, List, Picker, ListView} from "antd-mobile";
import PlatformListItem from "./component/PlatformListItem";
import MyNavBar from './component/MyNavBar';

import Size from './style/Size';
import MyPlaceHolder from "./component/MyPlaceHolder";
import MyIcon from "../Tools/MyIcon";

export default class AdActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ad: {
        title: "",
        url: "",
      }
    }
  }

  componentWillMount() {
    io.socket.get('/ad/' + this.props.params.id, {}, (ad, res) => {
      this.setState({
        ad: ad,
      });
    });
  }

  render() {

    return (
      <div>
        <MyNavBar onLeftClick={() => alert('leftClick')} rightIcon='filter'
                  onRightClick={() => alert('rightClick')}>{this.state.ad.title}</MyNavBar>
        <iframe src={this.state.ad.url}
                frameborder="0"
                width={Size.ScreenWidth}
                height={Size.ScreenHeight - Size.NavHeight - Size.PlaceHolderDefaultHeight}/>
        <MyPlaceHolder/>

      </div>);
  }
}
