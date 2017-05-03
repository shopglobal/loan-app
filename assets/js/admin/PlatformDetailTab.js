import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
var io = require('../../dependencies/sockets');


export default class PlatformDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: undefined,
      selectLabels: [],
      labels: [],
      platform: {
        "name": "",
        "logo": "",
        "slogan": "",
        "applyQuantity": 0,
        "successQuantity": 0,
        "grade": 0,
        "fastestTime": "",
        "averageTime": "",
        "condition": "",
        "necessary": "",
        "declaration": "",
        "minLimit": 0,
        "maxLimit": 0,
        "url": "",
        "plans": [],
        "labels": [],
      },
    }
  }

  componentWillMount() {
    let id = this.props.params.id;

    io.socket.get('/label/noPlatforms', {}, (labels, res) => {
      let formatLabels = [];
      labels.map((label) => {
        formatLabels.push({
          label: label.name,
          value: label.id,
        });
      });
      if (formatLabels.length !== 0) {
        this.setState({
          labels: formatLabels
        });
      }
    });

    if (id !== 0) {
      io.socket.get('/platform/' + id, {}, (platform, res) => {
        let labels = platform.labels;
        if (labels.length !== 0) {
          let formatLabels = [];
          labels.map((label) => {
            formatLabels.push(label.id);
          });
          platform.labels = formatLabels;
        }

        this.setState({
          imageUrl:platform.logo,
          selectLabels: platform.labels,
          platform: platform,
        });
      })
    }
  }

  save(platform) {
    let id = this.props.params.id;
    let newPlatform = {};


    if (id === 0) {
      io.socket.post('/platform', newPlatform);
    } else {
      io.socket.patch('/platform/' + id, newPlatform);
    }
  }

  validate() {
    let platform = {};
    let name, slogan, apply, success, grade, festest, average, condition, necessary, declaration;
    if ((name = document.getElementById('name')) === undefined) {

    }

    return platform;

  }

  render() {

    let platform = this.state.platform;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="logo">
            <MyUpload
              url={this.state.imageUrl}
              action="/platform/uploadLogo"
              afterUpload={(imageUrl) => {
                this.setState({imageUrl: imageUrl})
              }}/>
          </FormItem>
          <FormItem label="名称">
            <MyInput defaultValue={platform.name} id="name"/>
          </FormItem>
          <FormItem label="宣传语">
            <MyInput defaultValue={platform.slogan} id="slogan"/>
          </FormItem>
          <div style={{display: 'flex'}}>
            <FormItem label="申请人数">
              <MyInput defaultValue={platform.applyQuantity} id="apply"/>
            </FormItem>
            <FormItem label="成功次数">
              <MyInput defaultValue={platform.successQuantity} id="success"/>
            </FormItem>
          </div>
          <FormItem label="综合评分">
            <MyInput defaultValue={platform.grade} id="grade"/>
          </FormItem>
          <div style={{display: 'flex'}}>
            <FormItem label="最快放款时间">
              <MyInput defaultValue={platform.fastestTime} id="fastest"/>
            </FormItem>
            <FormItem label="平均放款时间">
              <MyInput defaultValue={platform.averageTime} id="average"/>
            </FormItem></div>
          <div style={{display: 'flex'}}>
            <FormItem label="申请最低金额">
              <MyInput defaultValue={platform.minLimit} id="min"/>
            </FormItem>
            <FormItem label="申请最高金额">
              <MyInput defaultValue={platform.maxLimit} id="max"/>
            </FormItem></div>
          <FormItem label="申请条件">
            <MyInput defaultValue={platform.condition} id="condition"/>
          </FormItem>
          <FormItem label="必须材料">
            <MyInput defaultValue={platform.necessary} id="necessary"/>
          </FormItem>
          <FormItem label="声明">
            <MyInput defaultValue={platform.declaration} id="declaration"/>
          </FormItem>
          <Checkbox.Group
            options={this.state.labels}
            defaultValue={this.state.selectLabels}
            onchange={(selectedValues) => this.setState({
              selectLabels: selectedValues,
            })}>标签</Checkbox.Group>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let platform = this.validate();
              if (platform !== undefined) {
                this.save(platform);
              }
            }}>保存</Button>
          </FormItem>
        </Form>
      </div>);
  }
}
