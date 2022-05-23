import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './ImageEditor.module.css';

import FileMenu from './FileMenu/FileMenu';
import Controls from './Controls/Controls';
import Canvas from './Canvas/Canvas';
import Loading from '../../components/Loading/Loading';

class ImageEditor extends Component {
  render() {
    return (
      <div>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <img src={require('../../assets/images/logo-left.png')} className={styles.logoLeft} />
            pixel artify
            <img src={require('../../assets/images/logo-right.png')} className={styles.logoRight} />
          </div>
          <FileMenu 
            exportImage={() => this.exportImage()}
            resetCanvas={() => this.resetCanvas()}
            history={this.props.history}/>
          {!this.props.isPaintEnabled && <Controls />}
        </div>
        <div className={styles.content}>
          <div className={styles.previewLabel}>Preview</div>
          <Canvas 
            setExportImage={click => this.exportImage = click}
            setResetCanvas={click => this.resetCanvas = click} />
          {this.props.loading ? <Loading /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    isPaintEnabled: state.isPaintEnabled
  };
};

export default connect(mapStateToProps)(ImageEditor);