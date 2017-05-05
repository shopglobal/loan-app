import React, {Component} from 'react';
import {Table} from 'antd';
import MyButton from "../Tools/MyButton";
var io = require('../../dependencies/sockets');


export default class WorthTestListTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      selectedRowKeys: [],
    };
  }

  componentWillMount() {
    io.socket.get('/worthquestion/sort/order/asc', {}, (questions, res) => {
      this.setState({
        questions: questions,
        loading: false,
      });
    });
  }

  deleteOne(questionId) {
    io.socket.delete('/worthquestion/' + questionId);
    let questions = this.state.questions;
    let len = questions.length;
    for (let i = 0; i < len; i++) {
      if (questions[i].id === questionId) {
        questions.splice(i, 1);
        this.setState({
          questions:questions,
        });
        return;
      }
    }
  }

  deleteSome() {

  }

  render() {
    const columns = [
      {
        title: '问题',
        dataIndex: 'question',
        key: 'question',
      },
      {
        title: '顺序',
        dataIndex: 'order',
        key: 'order',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, question) => (
          <div style={{display: 'flex'}}>
            <MyButton link={"/admin/worthquestion/" + question.id}>编辑</MyButton>
            <MyButton onClick={() => this.deleteOne(question.id)}>删除</MyButton>
          </div>),
      }
    ];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      //仅包括选中的项
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
        });
        console.log('onChange');
        console.log(selectedRowKeys, selectedRows);
      },
      //selected指是选中还是取消,record指操作的那条数据
      onSelect: (record, selected, selectedRows) => {
        console.log('onSelect');
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log('onSelectAll');
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    const title = (
      <div style={{display: 'flex',}}>
        <MyButton onClick={() => this.deleteSome()}>删除</MyButton>
        <MyButton link='/admin/worthquestion/0'>添加</MyButton>
      </div>
    );

    return (
      <Table
        scroll={{x: true}}
        title={() => title}
        rowSelection={rowSelection}
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.questions}
        loading={this.state.loading}
      />
    );
  }

}
