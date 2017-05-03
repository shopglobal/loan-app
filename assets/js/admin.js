require('../styles/index.less');


import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, Route, Router , IndexRoute} from "react-router";

import MainActivity from "./admin/MainActivity";
import AdTab from './admin/AdTab';
import HomeTab from './admin/HomeTab';
import PlatformListTab from './admin/PlatformListTab';
import HotPlatformTab from './admin/HotPlatformTab';
import PlatformDetailTab from './admin/PlatformDetailTab';


const router = (
  <Router history={browserHistory}>
    <Route path="/admin" component={MainActivity}>
      <IndexRoute component={HomeTab}/>
      <Route path='platforms' component={PlatformListTab}/>
      <Route path='platform/:id' component={PlatformDetailTab}/>
      <Route path='hotplatform' component={HotPlatformTab}/>
      <Route path='ad' component={AdTab}/>
    </Route>
  </Router>
);


ReactDOM.render(
  router,
  document.getElementById('admin')
);
