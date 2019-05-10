import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ImageEditor from './pages/ImageEditor/ImageEditor';

function App() {
  let routes = (
    <Switch>
      <Route path="/" exact component={ImageEditor} />
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
