import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';
import Controls from './Controls/Controls';

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logo}>pixel artify</Link>
      <Controls exportImage={props.exportImage} />
    </div>
  );
}

export default Sidebar;