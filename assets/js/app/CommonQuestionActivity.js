import React, {Component} from 'react';
import MyLittleTitleAndContent from "./component/MyLittleTitleAndContent";
import MyPlaceHolder from "./component/MyPlaceHolder";
import MyNavBar from "./component/MyNavBar";
import Size from './style/Size';

var io = require('../../dependencies/sockets');

export default class CommonQuestionActivity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		}
	}

	componentWillMount() {
		let f = (questions, res) => {
			this.setState({
				questions: questions,
			});
		};

		io.socket.get('/commonquestion/sort/order/asc', {}, (questions, res) => f(questions, res));

	}

	render() {

		let QuestionList = this.state.questions.map((question) => {
			return (<div>
				<MyLittleTitleAndContent
					key={question.id}
					title={question.question}>{question.answer}
				</MyLittleTitleAndContent>
				<MyPlaceHolder/>
			</div>);
		})
		return (
			<div>
				<MyNavBar>常见问题</MyNavBar>
				<div style={{
					height:Size.NormalContentHeight,
					overflow: 'auto',
				}}>{QuestionList}</div>
			</div>
		);
	}


}
