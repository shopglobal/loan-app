require('../styles/index.less');


import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, Route, Router} from "react-router";

import MainActivity from "./app/MainActivity";
import PlatformActivity from "./app/PlatformActivity";
import PlatformsActivity from "./app/PlatformsActivity";
import QuestionActivity from "./app/QuestionActivity";
import LabelTab from "./app/LabelTab";
import AdActivity from './app/AdActivity';
import LoanActivity from './app/LoanActivity';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={MainActivity}/>
    <Route path='/platforms(/:mode/:arg1(/:arg2))' component={PlatformsActivity}/>
    {/*<Route path='/platform/:id' component={PlatformActivity}/>*/}
    <Route path='/question' component={QuestionActivity}/>
    <Route path='/label' component={LabelTab}/>
    <Route path='/ad' component={AdActivity}/>
    <Route path='/loan/:id' component={LoanActivity}/>
  </Router>
);

ReactDOM.render(
  router,
  document.getElementById('index')
);
