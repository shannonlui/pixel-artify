import React from 'react';

import styles from './Loading.module.css';

const loading = () => (
  <div className={styles.loading}>
    <div className={styles.text}>Loading...</div>
  </div>
);

export default loading;