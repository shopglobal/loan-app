import React, {Component} from 'react';
import IconAndText from "./component/IconAndText";
import {List, ActionSheet, Toast, Modal, Popup, Button} from 'antd-mobile';
import Size from './style/Size';
import NormalListItem from './component/NormalListItem';
import {browserHistory} from 'react-router';
import MyIcon from "./component/MyIcon";
import MyButton from './component/MyButton';
var io = require('../../dependencies/sockets');

export default class MeTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasLogin: false,
      user: undefined,
    }
  }

  componentWillMount() {
    if (!this.state.hasLogin) {
      io.socket.get('/user/hasLogin', {}, (user, res) => {
        if (user !== undefined) {
          this.setState({
            hasLogin: true,
            user:user,
          });
        }
      })
    }
  }

  showServiceTele() {
    Popup.show(<div>
      <div>13102171390</div>
      <Button type="primary" onClick={() => Popup.hide()}>知道了</Button>
    </div>, {animationType: 'slide-up', maskClosable: true});
  };

  showAbout() {
    Popup.show(<div>
      <div>关于我们</div>
      <Button type="primary" onClick={() => Popup.hide()}>知道了</Button>
    </div>, {animationType: 'slide-up', maskClosable: true});
  }

  loginOrLogout() {
    if (this.state.hasLogin) {
      let user = this.state.user;
      io.socket.get('/user/logout', {id: user.id, phone: user.phone}, (msg ,res) => {
        alert(msg);
        if (msg==="OK") {
          this.setState({
            hasLogin: false,
            user:undefined,
          });
        }
      });
    } else {
      browserHistory.push('/login');
    }
  }

  testModalAlert(){
    Modal.alert('删除', '确定删除么???', [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
      { text: 'OK', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
    ]);
  }

  render() {
    return (
      <div>
        <IconAndText icon="images/icon/icon.png" text="aaa" onClick={() => this.loginOrLogout()}/>
        <List>
          <NormalListItem onClick={() => this.testModalAlert()}/>
          <NormalListItem onClick={() => this.showServiceTele()}>咨询客服</NormalListItem>
          <NormalListItem onClick={() => {
            Toast.show('已清除缓存');
          }}>清除缓存</NormalListItem>
          <NormalListItem onClick={() => this.showAbout()}>关于</NormalListItem>
          <MyButton style={{textDecoration: 'none',}}
                    onClick={() => this.loginOrLogout()}
          >{this.state.hasLogin ? '退出登录' : '登录'}</MyButton>
        </List>
      </div>);
  }
}


let styleListItem = {
  height: Size.NormalListItemHeight
}
