import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Canvas from './containers/Canvas/Canvas';

function App() {
  let routes = (
    <Switch>
      <Route path="/" exact component={Canvas} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
