import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {browserHistory} from 'react-router';
import MyCheckboxGroup from './component/MyCheckboxGroup';
var io = require('../../dependencies/sockets');


export default class LabelDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      selectPlatforms: [],
      newIcon: false,
      iconUrl: undefined,
      label: {
        name: "",
        icon: "",
        platforms: [],
      }
    }
  }

  componentWillMount() {
    let id = this.props.params.id;

    io.socket.get('/platform/select/name', {}, (platforms, res) => {
      let formatPlatforms = [];
      platforms.map((platform) => {
        formatPlatforms.push({
          label: platform.name,
          value: platform.id,
        });
      });
      if (formatPlatforms.length !== 0) {
        this.setState({
          platforms: formatPlatforms
        });
      }
    });

    if (id != 0) {
      io.socket.get('/label/' + id, {}, (label, res) => {
        let platforms = label.platforms;
        if (platforms.length !== 0) {
          let formatPlatforms = [];
          platforms.map((platform) => {
            formatPlatforms.push(platform.id);
          });
          label.platforms = formatPlatforms;
        }
        this.setState({
          iconUrl: label.icon,
          selectPlatforms: label.platforms,
          label: label,
        });
      })
    }
  }

  save(label) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/label', label);
    } else {
      if ('platforms' in label) {
        io.socket.patch('/label/' + id + '/setPlatform', {'platforms': label.platforms});
        delete label.platforms;
      }
      if (!this.isEmptyObject(label)) {
        io.socket.patch('/label/' + id, label);
      }
    }
  }


  validate() {

    let newLabel = {};

    //增加新的平台
    if (this.props.params.id == 0) {
      if (!this.state.newLogo) {
        alert("请上传标签icon！");
        return;
      }
      newLabel['icon'] = this.state.iconUrl;
      let name = document.getElementById('name').value;
      if (name == "") {
        alert("请输入标签名称！");
        return;
      }
      newLabel['name'] = name;

      newLabel['platforms'] = this.state.selectPlatforms;
    } else {
      //更新平台数据
      let name = document.getElementById('name').value;
      if (name != "") {
        newLabel['name'] = name;
      }
      if (this.state.newIcon) {
        newLabel['icon'] = this.state.iconUrl;
      }
      //如果经过选择，最终的结果没变就不更新
      if (this.state.selectPlatforms.sort().toString() != this.state.label.platforms.sort().toString()) {
        newLabel['platforms'] = this.state.selectPlatforms;
      }
    }

    return newLabel;
  }

  render() {

    let label = this.state.label;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="icon">
            <MyUpload
              url={this.state.iconUrl}
              action="/label/uploadIcon"
              afterUpload={(imageUrl) => {
                this.setState({newIcon: true, iconUrl: imageUrl})
              }}/>
          </FormItem>
          <FormItem label="名称">
            <MyInput placeholder={label.name} id="name"/>
          </FormItem>
          <FormItem label="贷款平台">
            <Checkbox.Group
              options={this.state.platforms}
              value={this.state.selectPlatforms}
              onChange={(selectedValues) => this.setState({selectPlatforms: selectedValues,})}/>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let label = this.validate();
              if (label) {
                this.save(label);
                browserHistory.push('/admin/labels')
              }
            }}>保存</Button>
          </FormItem>
        </Form>
      </div>);
  }

  isEmptyObject(e) {
    var t;
    for (t in e)
      return !1;
    return !0
  }
}
