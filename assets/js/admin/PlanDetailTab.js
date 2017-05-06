import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {Radio} from 'antd';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');


export default class PlanDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plan:{
        rate:"",
        time:"",
      }
    }
  }

  componentWillMount() {
    let id = this.props.params.id;
    if (id != 0) {
      io.socket.get('/plan/' + id+"/select/rate,time", {}, (plan, res) => {
        this.setState({
          plan: plan
        });
      })
    }
  }

  save(plan) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/plan', plan);
    } else {
      if (!this.isEmptyObject(plan)) {
        io.socket.patch('/plan/' + id, plan);
      }
    }
  }


  validate() {

    let example = [
      {
        id: 'time',
        alertStr: "请输入分期时间！"
      },
      {
        id: 'rate',
        alertStr: "请输入利率，格式为百分数！",
      },
    ];
    let newPlan = {};
    let len = example.length;

    let text, temp;
    //增加新的平台
    if (this.props.params.id == 0) {
      for (let i = 0; i < len; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text == "") {
          alert(temp.alertStr);
          return;
        }
        newPlan[temp.id] = text;
      }
      if(! (/^(0\.)\d+%$/.test(text))){
        alert(temp.alertStr);
        return;
      }
    } else {
      //更新平台数据
      for (let i = 0; i < len; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text != "") {
          newPlan[temp.id] = text;
        }
      }
      if ('rate' in newPlan) {
        if(! (/^(0\.)\d+%$/.test(text))){
          alert(temp.alertStr);
          return;
        }
      }
    }

    return newPlan;
  }

  render() {

    let plan = this.state.plan;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="分期时间">
            <MyInput placeholder={plan.time} id="time"/>
          </FormItem>
          <FormItem label="利率(百分数)">
            <MyInput placeholder={plan.rate} id="rate"/>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let plan = this.validate();
              if (plan) {
                this.save(plan);
                browserHistory.push('/admin/plans')
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

