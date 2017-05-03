import React, {Component} from 'react';
import {Link} from 'react-router';

import Color from '../app/style/Color';

export default class MyLink extends Component {

  render() {
    return (
      <Link to={this.props.to} style={{
        textDecoration: 'none',
        color: Color.Font,
      }}>
        {this.props.children}
      </Link>

    );
  }

}
