import React, { Component } from 'react';

import styles from './ImageEditor.module.css';
import Canvas from './Canvas/Canvas';
import Sidebar from './Sidebar/Sidebar';

class ImageEditor extends Component {
  render() {
    return(
      <div>
        <Sidebar exportImage={() => this.exportImage()} />
        <div className={styles.content}>
          <Canvas setExportImage={click => this.exportImage = click} />
        </div>
      </div>
    )
  }
}

export default ImageEditor;