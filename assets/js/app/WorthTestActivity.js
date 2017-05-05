import React, {Component} from 'react';
import MyNavBar from "./component/MyNavBar";
import Size from './style/Size';
import {List, Radio} from 'antd-mobile';
import MyButton from "../Tools/MyButton";

var io = require('../../dependencies/sockets');

export default class WorthTestActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [{question: "", answers: []}],
      index: 0,
      worth: 0,
      checked:0
    };
  }

  componentWillMount() {
    io.socket.get('/worthquestion', {}, (questions, res) => {
      let newQuestions = [];
      questions.map((question) => {
        let answers = [];
        for (let i = 1; i <= question.answerCount; i++) {
          answers.push({
            label: question['answer' + i],
            value: question['worth' + i],
          });
        }

        let newQuestion = {};
        newQuestion.question = question.question;
        newQuestion.answers = answers;

        newQuestions.push(newQuestion);
      });

      this.setState({
        questions:newQuestions
      });
    });


  }

  render() {
    let question = this.state.questions[this.state.index];

    return (
      <div>
        <MyNavBar>身价测试</MyNavBar>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: Size.ScreenWidth
          }}>{this.state.worth / 10000}万元
        </div>
        <div style={{
          display: 'flex',
          padding: Size.Padding,
          alignItems: 'center',
          height: 50,
          width: Size.ScreenWidth
        }}>{question.question}</div>
        <List>
          {question.answers.map(i => (
            <div
              style={{
                paddingLeft: 20,
                padding: 10,
                border: '1 solid'
              }}><Radio
              key={i.value}
              checked={this.state.checked===i.value}
              onChange={() => {
                this.setState({
                  checked:i.value,
                });
                this.state.worth += i.value;
                let index = this.state.index + 1;
                if (index < this.state.questions.length) {
                  setTimeout(() => this.setState({
                    index:index,
                    checked:0,
                  }), 800);
                }
              }}
            >{i.label}</Radio></div>
          ))}
        </List>
        <div
          style={{height: 150}}></div>
        <MyButton
          link="/"
          style={{display: this.state.questions.length === this.state.index + 1 ? 'flex' : 'none'}}>完成</MyButton>
      </div>
    );
  }

}
