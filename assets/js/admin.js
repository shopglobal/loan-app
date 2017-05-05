require('../styles/index.less');


import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, Route, Router, IndexRoute} from "react-router";

import MainActivity from "./admin/MainActivity";
import AdListTab from './admin/AdListTab';
import AdDetailTab from './admin/AdDetailTab';
import HomeTab from './admin/HomeTab';
import PlatformListTab from './admin/PlatformListTab';
import HotPlatformTab from './admin/HotPlatformTab';
import PlatformDetailTab from './admin/PlatformDetailTab';
import LabelListTab from './admin/LabelListTab';
import LabelDetailTab from './admin/LabelDetailTab';
import SettingTab from './admin/SettingTab';
import CommonQuestionListTab from './admin/CommonQuestionListTab';
import CommonQuestionDetailTab from './admin/CommonQuestionDetailTab';
import StrategyListTab from './admin/StrategyListTab';
import StrategyDetailTab from './admin/StrategyDetailTab';
import WorthTestListTab from './admin/WorthTestListTab';
import WorthTestDetailTab from './admin/WorthTestDetailTab';


const router = (
  <Router history={browserHistory}>
    <Route path="/admin" component={MainActivity}>
      <IndexRoute component={HomeTab}/>
      <Route path='platforms' component={PlatformListTab}/>
      <Route path='platform/:id' component={PlatformDetailTab}/>
      <Route path='hotplatform' component={HotPlatformTab}/>
      <Route path='labels' component={LabelListTab}/>
      <Route path='label/:id' component={LabelDetailTab}/>
      <Route path='ads' component={AdListTab}/>
      <Route path='ad/:id' component={AdDetailTab}/>
      <Route path='commonquestions' component={CommonQuestionListTab}/>
      <Route path='commonquestion/:id' component={CommonQuestionDetailTab}/>
      <Route path='strategies' component={StrategyListTab}/>
      <Route path='strategy/:id' component={StrategyDetailTab}/>
      <Route path='worthquestions' component={WorthTestListTab}/>
      <Route path='worthquestion/:id' component={WorthTestDetailTab}/>
      <Route path='setting' component={SettingTab}/>
    </Route>
  </Router>
);


ReactDOM.render(
  router,
  document.getElementById('admin')
);
