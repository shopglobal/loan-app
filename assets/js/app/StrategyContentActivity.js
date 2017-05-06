import React, {Component} from 'react';
import MyNavBar from "./component/MyNavBar";
import Size from './style/Size';
import MyPlaceHolder from "./component/MyPlaceHolder";
import {browserHistory} from 'react-router';

var io = require('../../dependencies/sockets');

export default class StrategyContentActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategy: {
        title:"",
        content:"",
      },
    }
  }

  componentWillMount() {
    io.socket.get('/strategy/' + this.props.params.id, {}, (strategy, res) => {
      this.setState({
        strategy: strategy,
      });
    });
  }

  render() {
    return (
      <div>
        <MyNavBar onLeftClick={()=>browserHistory.goBack()}>{this.state.strategy.title}</MyNavBar>
        <iframe
          width={Size.ScreenWidth}
          src={this.state.strategy.content}
          height={Size.NormalContentHeight}/>
        <MyPlaceHolder/>
      </div>
    );
  }


}
