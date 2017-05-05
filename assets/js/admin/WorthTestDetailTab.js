import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import MyInput from "./component/MyInput";
import MyUpload from "./component/MyUpload";
const FormItem = Form.Item;
import {Radio} from 'antd';
import {browserHistory} from 'react-router';
var io = require('../../dependencies/sockets');


export default class WorthTestDetailTab extends Component {

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
      io.socket.get('/worthquestion/' + id, {}, (question, res) => {
        this.setState({
          question: question
        });
      })
    }
  }

  save(worthquestion) {
    let id = this.props.params.id;

    if (id == 0) {
      io.socket.post('/worthquestion', worthquestion);
    } else {
      if (!this.isEmptyObject(worthquestion)) {
        io.socket.patch('/worthquestion/' + id, worthquestion);
      }
    }
  }


  validate() {

    let example = [
      {
        id: 'question',
        alertStr: "请输入题目！"
      },
      {
        id: 'answer1',
        alertStr: "请输入选项一！"
      },
      {
        id: 'answer2',
        alertStr: "请输入选项二！"
      },
      {
        id: 'answer3',
        alertStr: "请输入选项三！"
      },
      {
        id: 'answer4',
        alertStr: "请输入选项四！"
      },
      {
        id: 'order',
        alertStr: "请输入顺序！",
        alertStr2: "顺序为正整数！",
      },
      {
        id: 'worth1',
        alertStr: "请输入价值一！",
        alertStr2: "价值为正整数！",

      },
      {
        id: 'worth2',
        alertStr: "请输入价值二！",
        alertStr2: "价值为正整数！",
      },
      {
        id: 'worth3',
        alertStr: "请输入价值三！",
        alertStr2: "价值为正整数！",
      },
      {
        id: 'worth4',
        alertStr: "请输入价值四！",
        alertStr2: "价值为正整数！",
      },
    ];
    let newQuestion = {};
    let len = example.length;

    let text, temp;
    let flagIndex = 5;
    //增加新的平台
    if (this.props.params.id == 0) {
      for (let i = 0; i < flagIndex-1; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text == "") {
          alert(temp.alertStr);
          return;
        }
        newQuestion[temp.id] = text;
      }
      for (let i = flagIndex; i < len-1; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text == "") {
          alert(temp.alertStr);
          return;
        } else if (!(/^\d+$/.test(text))) {
          alert(temp.alertStr2);
          return;
        }
        newQuestion[temp.id] = parseInt(text);
      }
      //选项四可有可无，单独处理
      temp = example[flagIndex-1];
      if((text = document.getElementById(temp.id).value) != ""){
        newQuestion[temp.id] = text;
        temp = example[len-1];
        text = document.getElementById(temp.id).value;
        if (text == "") {
          alert(temp.alertStr);
          return;
        } else if (!(/^\d+$/.test(text))) {
          alert(temp.alertStr2);
          return;
        }
        newQuestion[temp.id] = parseInt(text);
      }
      if('answer4' in newQuestion){
        newQuestion.answerCount = 4;
      }else {
        newQuestion.answerCount = 3;
      }

    } else {
      //更新平台数据
      for (let i = 0; i < flagIndex; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text != "") {
          newQuestion[temp.id] = text;
        }
      }
      for (let i = flagIndex; i < len; i++) {
        temp = example[i];
        text = document.getElementById(temp.id).value;
        if (text != "") {
          if (!(/^\d+$/.test(text))) {
            alert(temp.alertStr2);
            return;
          }
          newQuestion[temp.id] = parseInt(text);
        }
      }
      if(this.state.question.answerCount === 3 && 'answer4' in newQuestion){
        newQuestion.answerCount = 4;
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
          <FormItem label="题目">
            <MyInput placeholder={question.question} id="question"/>
          </FormItem>
          <FormItem label="题目顺序">
            <MyInput placeholder={question.order} id="order"/>
          </FormItem>
          <div style={{display: 'flex'}}>
            <FormItem label="选项1">
              <MyInput placeholder={question.answer1} id="answer1"/>
            </FormItem>
            <FormItem label="价值1">
              <MyInput placeholder={question.worth1} id="worth1"/>
            </FormItem>
          </div>
          <div style={{display: 'flex'}}>
            <FormItem label="选项2">
              <MyInput placeholder={question.answer2} id="answer2"/>
            </FormItem>
            <FormItem label="价值2">
              <MyInput placeholder={question.worth2} id="worth2"/>
            </FormItem>
          </div>
          <div style={{display: 'flex'}}>
            <FormItem label="选项3">
              <MyInput placeholder={question.answer3} id="answer3"/>
            </FormItem>
            <FormItem label="价值3">
              <MyInput placeholder={question.worth3} id="worth3"/>
            </FormItem>
          </div>
          <div style={{display: 'flex'}}>
            <FormItem label="选项4(可以不填)">
              <MyInput placeholder={question.answer4} id="answer4"/>
            </FormItem>
            <FormItem label="价值4">
              <MyInput placeholder={question.worth4} id="worth4"/>
            </FormItem>
          </div>

          <FormItem>
            <Button type="primary" size="large" onClick={() => {
              let worthquestion = this.validate();
              if (worthquestion) {
                this.save(worthquestion);
                browserHistory.push('/admin/worthquestions')
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

