import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
  render() {
    let toolbar = <Toolbar />;
    if (this.props.location.pathname === '/') {
      toolbar = <Toolbar theme='light' />;
    }

    return (
      <React.Fragment>
        {toolbar}
        <main className={styles.content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
