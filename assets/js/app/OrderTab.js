import React, {Component} from "react";
import {ListView} from "antd-mobile";
import MyNavBar from './component/MyNavBar';
import Size from './style/Size';

import MyOrderListItem from "./component/MyOrderListItem";


export default class OrderTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows([]),
        }
    }

    render() {
        return (<div>
            <MyNavBar leftIcon='false' title="订单"/>
            <ListView
                style={styleListView}
                dataSource={this.state.dataSource}
                renderRow={()=><MyOrderListItem data={data}/>}/>
        </div>);
    }
}

let data={
	"createdAt": 1493048440025,
	"updatedAt": 1493048440025,
	"id": 2,
	"name": "123234",
	"logo": "/images/icon/icon.png",
	"slogan": "Howie",
	"adPicture": "",
	"applyQuantity": 1000,
	"successQuantity": 100,
	"grade": 6,
	"fastestTime": "",
	"averageTime": "",
	"condition": "",
	"necessary": "",
	"declaration": "",
	"minLimit": 0,
	"maxLimit": 0,
	"plans": [],
	"labels": [],
	"orders": []
};

let styleListView = {
    height: document.documentElement.clientHeight-Size.NavHeight-Size.TabBarHeight,
    overflow: 'scroll'
}



