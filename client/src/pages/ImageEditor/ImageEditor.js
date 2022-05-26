import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ImageEditor.module.css';

import FileMenu from './FileMenu/FileMenu';
import Controls from './Controls/Controls';
import Canvas from './Canvas/Canvas';
import Loading from '../../components/Loading/Loading';
import PaintTools from './PaintTools/PaintTools';

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
          {this.props.isPaintEnabled ? <PaintTools /> : <Controls />}
        </div>
        <div className={styles.content}>
          <Canvas 
            setExportImage={click => this.exportImage = click}
            setResetCanvas={click => this.resetCanvas = click} />
          {this.props.loading && <Loading />}
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