import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {browserHistory} from 'react-router';
import MyCheckboxGroup from './component/MyCheckboxGroup';
var io = require('../../dependencies/sockets');


export default class PlatformDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newLogo: false,
      imageUrl: undefined,
      selectLabels: [],
      labels: [],
      platform: {
        "name": undefined,
        "logo": undefined,
        "slogan": undefined,
        "applyQuantity": undefined,
        "successQuantity": undefined,
        "grade": undefined,
        "fastestTime": undefined,
        "averageTime": undefined,
        "condition": undefined,
        "necessary": undefined,
        "declaration": undefined,
        "minLimit": undefined,
        "maxLimit": undefined,
        "url": undefined,
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

    if (id != 0) {
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
          imageUrl: platform.logo,
          selectLabels: platform.labels,
          platform: platform,
        });
      })
    }
  }

  save(platform) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/platform', platform);
    } else {
      if ('labels' in platform) {
        io.socket.patch('/platform/' + id + '/setLabel', {'labels': platform.labels});
        delete platform.labels;
      }
      if (!this.isEmptyObject(platform)) {
        io.socket.patch('/platform/' + id, platform);
      }
    }
  }


  validate() {
    let example = [
      {
        id: 'name',
        alertStr: "贷款平台名称不能为空！"
      },
      {
        id: 'slogan',
        alertStr: "贷款平台宣传语不能为空！"
      },
      {
        id: 'fastestTime',
        alertStr: "贷款平台最快放款时间不能为空！"
      },
      {
        id: 'averageTime',
        alertStr: "贷款平台平均放款时间不能为空！"
      },
      {
        id: 'condition',
        alertStr: "贷款平台申请条件不能为空！"
      },
      {
        id: 'necessary',
        alertStr: "贷款平台必须材料不能为空！"
      },
      {
        id: 'declaration',
        alertStr: "贷款平台声明不能为空！"
      },
      {
        id: 'applyQuantity',
        alertStr: "请输入正确的贷款平台申请人数！"
      },
      {
        id: 'successQuantity',
        alertStr: "请输入正确的贷款平台申请成功次数！"
      },
      {
        id: 'grade',
        alertStr: "请输入正确的贷款平台综合评分！"
      },
      {
        id: 'minLimit',
        alertStr: "请输入正确的贷款平台最小申请额度！"
      },
      {
        id: 'maxLimit',
        alertStr: "请输入正确的贷款平台最大申请额度！"
      },
    ];

    let newPlatform = {};
    //从index=7开始的各项都是数字项，要转化为数字
    let len = example.length;
    let flagIndex = 7;
    let text;
    let temp;
    //增加新的平台
    if (this.props.params.id == 0) {
      for (let i = 0; i < flagIndex; i++) {
        temp = example[i];
        if ((text = document.getElementById(temp.id).value) == "") {
          alert(temp.alertStr);
          return;
        }
        newPlatform[temp.id] = text;
      }
      for (let i = flagIndex; i < len; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (!(/\d+/.test(text))) {
          alert(temp.alertStr);
          return;
        }
        newPlatform[temp.id] = parseInt(text);
      }
      if (!this.state.newLogo) {
        alert("请上传贷款平台logo！");
        return;
      }
      newPlatform['logo'] = this.state.imageUrl;

      let url = document.getElementById('url').value;
      if (url == "") {
        alert("贷款平台官网不能为空！");
        return;
      } else if (!(/^(http)s?:\/\/\w+/.test(url))) {
        alert("贷款平台官网格式不正确，请以“http://”或“https://”开头！");
        return;
      }
      newPlatform['url'] = url;

      newPlatform['labels'] = this.state.selectLabels;
    } else {
      //更新平台数据
      for (let i = 0; i < flagIndex; i++) {
        temp = example[i];
        if ((text = document.getElementById(temp.id).value) != "") {
          newPlatform[temp.id] = text;
        }
      }
      for (let i = flagIndex; i < len; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text != "") {
          if (!(/\d+/.test(text))) {
            alert(temp.alertStr);
            return;
          }
          newPlatform[temp.id] = parseInt(text);
        }
      }
      if (this.state.newLogo) {
        newPlatform['logo'] = this.state.imageUrl;
      }
      //如果经过选择，最终的结果没变就不更新
      if (this.state.selectLabels.sort().toString() != this.state.platform.labels.sort().toString()) {
        newPlatform['labels'] = this.state.selectLabels;
      }
      let url = document.getElementById('url').value;
      if (url != "") {
        if (!(/^(http)s?:\/\/\w+/.test(url))) {
          alert("贷款平台官网格式不正确，请以“http://”或“https://”开头！");
          return;
        }
        newPlatform['url'] = url;
      }
    }

    return newPlatform;
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
                this.setState({newLogo: true, imageUrl: imageUrl})
              }}/>
          </FormItem>
          <FormItem label="名称">
            <MyInput placeholder={platform.name} id="name"/>
          </FormItem>
          <FormItem label="宣传语">
            <MyInput placeholder={platform.slogan} id="slogan"/>
          </FormItem>
          <FormItem label="官网网址">
            <MyInput placeholder={platform.url} id="url"/>
          </FormItem>
          <div style={{display: 'flex'}}>
            <FormItem label="申请人数">
              <MyInput placeholder={platform.applyQuantity} id="applyQuantity"/>
            </FormItem>
            <FormItem label="成功次数">
              <MyInput placeholder={platform.successQuantity} id="successQuantity"/>
            </FormItem>
          </div>
          <FormItem label="综合评分">
            <MyInput placeholder={platform.grade} id="grade"/>
          </FormItem>
          <div style={{display: 'flex'}}>
            <FormItem label="最快放款时间">
              <MyInput placeholder={platform.fastestTime} id="fastestTime"/>
            </FormItem>
            <FormItem label="平均放款时间">
              <MyInput placeholder={platform.averageTime} id="averageTime"/>
            </FormItem></div>
          <div style={{display: 'flex'}}>
            <FormItem label="申请最低金额">
              <MyInput placeholder={platform.minLimit} id="minLimit"/>
            </FormItem>
            <FormItem label="申请最高金额">
              <MyInput placeholder={platform.maxLimit} id="maxLimit"/>
            </FormItem></div>
          <FormItem label="申请条件">
            <MyInput placeholder={platform.condition} id="condition"/>
          </FormItem>
          <FormItem label="必须材料">
            <MyInput placeholder={platform.necessary} id="necessary"/>
          </FormItem>
          <FormItem label="声明">
            <MyInput placeholder={platform.declaration} id="declaration"/>
          </FormItem>
          <Checkbox.Group
            options={this.state.labels}
            value={this.state.selectLabels}
            onChange={(selectedValues) => this.setState({selectLabels: selectedValues,})}/>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let platform = this.validate();
              if (platform) {
                this.save(platform);
                browserHistory.push('/admin/platforms')
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
