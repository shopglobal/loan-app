import React, {Component} from "react";
import MyNavBar from "./component/MyNavBar";
import Size from "./style/Size";
import Color from "./style/Color";
import {List, Radio} from "antd-mobile";
import MyButton from "../Tools/MyButton";
import {browserHistory} from "react-router";

var io = require('../../dependencies/sockets');

export default class WorthTestActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			questions: [{question: "", answers: []}],
			index: 0,
			worth: 0,
			checked: 0
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
				questions: newQuestions
			});
		});


	}

	render() {
		let question = this.state.questions[this.state.index];

		return (
			<div>
				<MyNavBar onLeftClick={()=>browserHistory.goBack()}>身价测试</MyNavBar>
				<div>
					<div
						style={{
							position:'absolute',
							color:Color.White,
							display: 'flex',
							justifyContent: 'center',
							top:Size.ScreenWidth / 1.6/4*3,
							fontSize:80,
							width: Size.ScreenWidth
						}}>{this.state.worth / 10000}
					</div>
					<img style={{
						width: Size.ScreenWidth,
						height: Size.ScreenWidth / 1.6,
					}} src="/images/worthback.png" alt=""/>
				</div>

				<div style={{
					display: 'flex',
					backgroundColor: Color.White,
					paddingLeft: Size.PagePaddingLeftAndRight,
					paddingRight: Size.PagePaddingLeftAndRight,
					alignItems: 'center',
					height: 50,
					width: Size.ScreenWidth,
					fontSize: Size.NormalFontSize
				}}>{question.question}</div>
				<List>
					{question.answers.map(i => (
						<div
							style={{
								fontSize: Size.NormalFontSize,
								padding: Size.Padding * 2,
								paddingLeft: Size.PagePaddingLeftAndRight,
								paddingRight: Size.PagePaddingLeftAndRight,
								border: '1 solid'
							}}><Radio
							key={i.value}
							checked={this.state.checked === i.value}
							onChange={() => {
								this.setState({
									checked: i.value,
								});
								this.state.worth += i.value;
								let index = this.state.index + 1;
								if (index < this.state.questions.length) {
									setTimeout(() => this.setState({
										index: index,
										checked: 0,
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
