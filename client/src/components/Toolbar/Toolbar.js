import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Toolbar.module.css';

const classes = {
  'light': styles.light,
}

const toolbar = (props) => (
  <header className={`${styles.toolbar} ${classes[props.theme]}`}>
    <Link to="/" className={styles.logo}>
      <img src={require('../../assets/images/logo-left.png')} className={styles.logoLeft} />
      pixel artify
      <img src={require('../../assets/images/logo-right.png')} className={styles.logoRight} />
    </Link>
  </header>
);

export default toolbar;