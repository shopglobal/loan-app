import React, {Component} from 'react';
import MyNavBar from "./component/MyNavBar";
import StrategyListItem from "./component/StrategyListItem";
import Size from './style/Size';
import {ListView} from 'antd-mobile';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');

export default class StrategyListActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategies: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([]),
    }
  }

  componentWillMount(){
    io.socket.get('/strategy/sort/updatedAt/desc' , {} , (strategies , res)=>{
      this.setState({
        strategies:strategies,
        dataSource: this.state.dataSource.cloneWithRows(strategies),
      });
    });
  }

  readStrategy(strategy){
    let newStrategy = {
      readQuantity:strategy.readQuantity+1,
    };
    io.socket.patch('/strategy/'+strategy.id , newStrategy ,(strategy , res)=>{});
    browserHistory.push('/strategycontent/'+strategy.id);
  }

  render() {
    return (
      <div>
        <MyNavBar onLeftClick={()=>browserHistory.goBack()}>借款攻略</MyNavBar>
        <ListView
          style={styleListView}
          dataSource={this.state.dataSource}
          renderRow={(strategy) => <StrategyListItem onClick={(strategy)=>this.readStrategy(strategy)} key={strategy.id} data={strategy}/>}/>
      </div>
    );
  }


}

let styleListView = {
  borderWidth: 0,
  height: Size.NormalContentHeight,
  overflow: 'scroll'
}
