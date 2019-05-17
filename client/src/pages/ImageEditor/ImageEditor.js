import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './ImageEditor.module.css';

import Controls from './Controls/Controls';
import Canvas from './Canvas/Canvas';

class ImageEditor extends Component {
  render() {
    return(
      <div>
        <div className={styles.sidebar}>
          <Link to="/" className={styles.logo}>pixel artify</Link>
          <Controls exportImage={() => this.exportImage()} />
        </div>
        <div className={styles.content}>
          <Canvas setExportImage={click => this.exportImage = click} />
        </div>
      </div>
    )
  }
}

export default ImageEditor;