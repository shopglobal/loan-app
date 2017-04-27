import React, {Component} from 'react';
import {TabBar, Icon} from 'antd-mobile';

import HomeTab from './HomeTab';
import OrderTab from './OrderTab';
import MeTab from './MeTab';
import LabelTab from './LabelTab';
import PlatformsActivity from "./PlatformsActivity";

import Size from './style/Size';


class MainActivity extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: homeTabKey,
        };
    }

    renderContent(pageText) {
        //console.log(pageText);
        switch (pageText) {
            case homeTabKey:
                return (<HomeTab/>);
                break;

            case labelTabKey:
                return (<LabelTab flag="main"/>);
                //return (<PlatformsActivity/>);
                break;

            case orderTabKey:
                return (<OrderTab/>);
                break;

            case meTabKey:
                return (<MeTab/>);
                break;
        }

    }

    render() {
        return (
            <TabBar
                style={{height:Size.TabBarHeight}}
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="首页"
                    key={homeTabKey}
                    icon={{uri: 'images/icon/icon.png'}}
                    selectedIcon={{uri:'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'}}
                    selected={this.state.selectedTab === homeTabKey}
                    onPress={() => {
                        this.setState({
                            selectedTab: homeTabKey,
                        });
                    }}
                >
                    {this.renderContent(homeTabKey)}
                </TabBar.Item>

                <TabBar.Item
                    icon={{uri: 'images/icon/icon.png'}}
                    selectedIcon={{uri: 'images/icon/icon.png'}}
                    title="发现"
                    key={labelTabKey}
                    selected={this.state.selectedTab === labelTabKey}
                    onPress={() => {
                        this.setState({
                            selectedTab: labelTabKey,
                        });
                    }}
                >
                    {this.renderContent(labelTabKey)}
                </TabBar.Item>

                <TabBar.Item
                    icon={{uri:'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'}}
                    selectedIcon={{uri:'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'}}
                    title="订单"
                    key={orderTabKey}
                    selected={this.state.selectedTab === orderTabKey}
                    onPress={() => {
                        this.setState({
                            selectedTab: orderTabKey,
                        });
                    }}
                >
                    {this.renderContent(orderTabKey)}
                </TabBar.Item>


                <TabBar.Item
                    icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                    selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                    title="我的"
                    key={meTabKey}
                    selected={this.state.selectedTab === meTabKey}
                    onPress={() => {
                        this.setState({
                            selectedTab: meTabKey,
                        });
                    }}
                >
                    {this.renderContent(meTabKey)}
                </TabBar.Item>
            </TabBar>
        );
    }
}

let homeTabKey = 'homeTab';
let labelTabKey = 'labelTab';
let orderTabKey = 'orderTab';
let meTabKey = 'meTab';

export default MainActivity;
