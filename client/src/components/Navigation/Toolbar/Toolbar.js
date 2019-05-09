import React from 'react';

import styles from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={styles.toolbar}>
    <div className={styles.logo}>pixel artify</div>
  </header>
);

export default toolbar;