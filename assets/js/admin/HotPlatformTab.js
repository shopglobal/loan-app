import React, {Component} from 'react';
import {Checkbox, Button , message} from 'antd';
var io = require('../../dependencies/sockets');


export default class HotPlatformTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      hotPlatforms: [],
      label: undefined
    }
  }

  componentWillMount() {
    io.socket.get('/platform/select/name', {}, (platforms, res) => {
      let formatPlatforms = [];
      platforms.map((platform) => {
        formatPlatforms.push({
          label: platform.name,
          value: platform.id,
        });
      });
      this.setState({
        platforms: formatPlatforms,
      });
    });

    io.socket.get('/label/name/热门', {}, (label, res) => {
      let platforms = label.platforms;
      if (platforms.length === 0) {
        return;
      }
      let formatPlatforms = [];
      platforms.map((platform) => {
        formatPlatforms.push(platform.id);
      });
      label.platforms = formatPlatforms;
      this.setState({
        hotPlatforms: formatPlatforms,
        label: label
      });
    });
  }

  save() {

    let label = this.state.label;
    let hotPlatforms = this.state.hotPlatforms;
    if (hotPlatforms.sort().toString() != label.platforms.sort().toString()) {
      io.socket.patch('/label/' + label.id + '/setPlatform', {platforms: hotPlatforms});
    }
    message.info('设置成功');
    label.platforms = hotPlatforms;

  }

  render() {
    return (<div>
      <div>热门贷款平台</div>
      <Checkbox.Group
        options={this.state.platforms}
        value={this.state.hotPlatforms}
        onChange={(selectedValues) => this.setState({hotPlatforms: selectedValues,})}/>
      <Button onClick={()=>this.save()}>保存</Button>
    </div>);
  }
}
