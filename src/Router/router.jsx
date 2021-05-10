import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Main from '../Pages/Main/main';
import HardwareVision from '../Pages/HardwareVision/hardwareVision';
import ExpectedsGains from '../Pages/ExpectedsGains/expectedsGains';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/Main" component={Main} />
      <Route path="/HardwareVision" component={HardwareVision} />
      <Route path="/ExpectedsGains" component={ExpectedsGains} />
      <Route path="*" component={Main} />
    </Switch>
  );
}

export default Router;
