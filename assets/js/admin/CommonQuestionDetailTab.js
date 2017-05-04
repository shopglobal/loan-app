import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {Radio} from 'antd';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');


export default class CommonQuestionDetailTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: {
        question: "",
        answer: "",
        order: undefined,
      }
    }
  }

  componentWillMount() {
    let id = this.props.params.id;
    if (id != 0) {
      io.socket.get('/commonquestion/' + id, {}, (question, res) => {
        this.setState({
          question: question
        });
      })
    }
  }

  save(commonquestion) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/commonquestion', commonquestion);
    } else {
      if (!this.isEmptyObject(commonquestion)) {
        io.socket.patch('/commonquestion/' + id, commonquestion);
      }
    }
  }


  validate() {

    let example = [
      {
        id: 'question',
        alertStr: "请输入问题！"
      },
      {
        id: 'answer',
        alertStr: "请输入答案！"
      },
      {
        id: 'order',
        alertStr: "请输入顺序！"
      }
    ];
    let newQuestion = {};
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
        newQuestion[temp.id] = text;
      }
      let order = newQuestion.order;
      if (!(/\d+/.test(order))) {
        alert("顺序为正整数！");
        return;
      }
      newQuestion['order'] = parseInt(order);
    } else {
      //更新平台数据
      for (let i = 0; i < len; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text != "") {
          newQuestion[temp.id] = text;
        }
      }
      if ('order' in newQuestion) {
        let order = newQuestion.order;
        if (!(/\d+/.test(order))) {
          alert("顺序为正整数！");
          return;
        }
        newQuestion['order'] = parseInt(order);
      }
    }

    return newQuestion;
  }

  render() {

    let question = this.state.question;

    return (
      <div>
        <div>平台详情</div>
        <Form layout='horizontal'>
          <FormItem label="问题">
            <MyInput placeholder={question.question} id="question"/>
          </FormItem>
          <FormItem label="答案">
            <MyInput placeholder={question.answer} id="answer"/>
          </FormItem>
          <FormItem label="顺序">
            <MyInput placeholder={question.order} id="order"/>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let commonquestion = this.validate();
              if (commonquestion) {
                this.save(commonquestion);
                browserHistory.push('/admin/commonquestions')
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

