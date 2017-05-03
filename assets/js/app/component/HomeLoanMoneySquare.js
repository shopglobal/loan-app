import React, {Component} from 'react';
import Size from '../style/Size';
import Color from '../style/Color';

import {Flex} from 'antd-mobile';
import MyLink from "../../Tools/MyLink";

export default class HomeLoanMoneySquare extends Component {

  render() {

    let moneySquer = (money) => {
      return (
        <Flex>
          <div>{money}</div>
          <div style={{fontSize: Size.LittleFontSize}}>元</div>
        </Flex>
      );
    };

    let min = this.props.min || 1000;
    let max = this.props.max || 5000;
    if (min === 0 || min === '0') {
      var squre = (
        <div>
          {moneySquer(1000)}
          <div style={styleText}>以下</div>
        </div>);
    }
    else if (max === 'max') {
      var squre = (
        <div>
          {moneySquer(10000)}
          <div style={styleText}>以上</div>
        </div>);
    } else {
      var squre = (
        <div>
          {moneySquer(min)}
          <div>~</div>
          {moneySquer(max)}
        </div>);
    }


    return (
      <div style={{
        height: Size.SquareHeight,
        margin: Size.Padding,
        backgroundColor: Color.Square,
        padding: Size.Padding,
      }}>
        <MyLink to={this.props.link}>
          {squre}</MyLink>
      </div>
    );
  }
}

let styleText = {
  fontSize: Size.SmallFontSize,
  color: Color.NormalText,
  textAlign: 'center',
};
