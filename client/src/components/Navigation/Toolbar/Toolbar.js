import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Toolbar.module.css';

const classes = {
  'light': styles.light,
}

const toolbar = (props) => (
  <header className={`${styles.toolbar} ${classes[props.theme]}`}>
    <Link to="/" className={styles.logo}>pixel artify</Link>
  </header>
);

export default toolbar;