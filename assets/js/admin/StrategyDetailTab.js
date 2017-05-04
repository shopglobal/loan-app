import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {browserHistory} from 'react-router';
import MyCheckboxGroup from './component/MyCheckboxGroup';
var io = require('../../dependencies/sockets');


export default class StrategyDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newIcon: false,
      iconUrl: undefined,
      strategy: {
        "title": "",
        "readQuantity": 0,
        "icon": "",
        "content": ""
      },
    }
  }

  componentWillMount() {
    let id = this.props.params.id;

    if (id != 0) {
      io.socket.get('/strategy/' + id, {}, (strategy, res) => {
        this.setState({
          iconUrl: strategy.icon,
          strategy: strategy,
        });
      })
    }
  }

  save(strategy) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/strategy', strategy);
    } else {
      if (!this.isEmptyObject(strategy)) {
        io.socket.patch('/strategy/' + id, strategy);
      }
    }
  }


  validate() {
    let example = [
      {
        id: 'title',
        alertStr: "借款攻略标题不能为空！"
      },
      {
        id: 'content',
        alertStr: "借款攻略内容链接不能为空！"
      },
    ];

    let newStrategy = {};
    let len = example.length;
    let text;
    let temp;
    //增加新的平台
    if (this.props.params.id == 0) {
      for (let i = 0; i < len; i++) {
        temp = example[i];
        if ((text = document.getElementById(temp.id).value) == "") {
          alert(temp.alertStr);
          return;
        }
        newStrategy[temp.id] = text;
      }
      if (!this.state.newIcon) {
        alert("请上传借款攻略图标！");
        return;
      }
      newStrategy['icon'] = this.state.iconUrl;

    } else {
      //更新平台数据
      for (let i = 0; i < len; i++) {
        temp = example[i];
        if ((text = document.getElementById(temp.id).value) != "") {
          newStrategy[temp.id] = text;
        }
      }
      if (this.state.newIcon) {
        newStrategy['icon'] = this.state.iconUrl;
      }
    }

    if ('content' in newStrategy) {
      let content = newStrategy.content;
      if (!(/^(http)s?:\/\/\w+/.test(content))) {
        alert("借款攻略内容链接格式不正确，请以“http://”或“https://”开头！");
        return;
      }
    }

    let readQuantity = document.getElementById('readQuantity').value;
    if (readQuantity != "") {
      if (/\d+/.test(readQuantity)) {
        newStrategy.readQuantity = readQuantity;
      } else {
        alert('阅读量为正整数！');
        return;
      }
    }

    return newStrategy;
  }

  render() {

    let strategy = this.state.strategy;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="icon">
            <MyUpload
              url={this.state.iconUrl}
              action="/strategy/uploadIcon"
              afterUpload={(imageUrl) => {
                this.setState({newIcon: true, iconUrl: imageUrl})
              }}/>
          </FormItem>
          <FormItem label="标题">
            <MyInput placeholder={strategy.title} id="title"/>
          </FormItem>
          <FormItem label="阅读量">
            <MyInput placeholder={strategy.readQuantity} id="readQuantity"/>
          </FormItem>
          <FormItem label="内容链接">
            <MyInput placeholder={strategy.content} id="content"/>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let strategy = this.validate();
              if (strategy) {
                this.save(strategy);
                browserHistory.push('/admin/strategies')
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
