import React, { Component } from 'react';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;
