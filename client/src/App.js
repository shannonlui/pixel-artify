import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import ImageEditor from './pages/ImageEditor/ImageEditor';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/editor" exact component={ImageEditor} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
