require('../styles/index.less');


import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, Route, Router} from "react-router";

import MainActivity from "./app/MainActivity";
import PlatformsActivity from "./app/PlatformsActivity";
import WorthTestActivity from "./app/WorthTestActivity";
import LabelTab from "./app/LabelTab";
import AdActivity from './app/AdActivity';
import LoanActivity from './app/LoanActivity';
import StrategyListActivity from './app/StrategyListActivity';
import StrategyContentActivity from './app/StrategyContentActivity';
import CommonQuestionActivity from './app/CommonQuestionActivity';
import GuideActivity from './app/GuideActivity';
import LoginActivity from './app/LoginActivity';


const router = (
  <Router history={browserHistory}>
    <Route path="/" component={MainActivity}/>
    <Route path='/platforms(/:mode/:arg1(/:arg2))' component={PlatformsActivity}/>
    {/*<Route path='/platform/:id' component={PlatformActivity}/>*/}
    <Route path='/worthtest' component={WorthTestActivity}/>
    <Route path='/label' component={LabelTab}/>
    <Route path='/ad' component={AdActivity}/>
    <Route path='/loan/:id' component={LoanActivity}/>
    <Route path='/strategycontent/:id' component={StrategyContentActivity}/>
    <Route path='/strategylist' component={StrategyListActivity}/>
    <Route path='/commonquestion' component={CommonQuestionActivity}/>
    <Route path='/guide' component={GuideActivity}/>
    <Route path='/login' component={LoginActivity}/>
  </Router>
);

ReactDOM.render(
  router,
  document.getElementById('index')
);
