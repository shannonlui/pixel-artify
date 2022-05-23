import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { CgColorPicker, CgErase } from "react-icons/cg";
import { IoIosBrush } from "react-icons/io";

import * as actions from '../../../store/actions';
import styles from './PaintTools.module.css';

class PaintTools extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeColor = (color) => {
    this.props.onChangeColor(color.hex);
  };

  render() {
    const pickerStyles = {
      picker: {
        padding: '10px 10px 0',
        boxSizing: 'initial',
        background: '#ddd',
        borderRadius: '4px',
      }
    }
    return (
      <div className={styles.container}>
        <div className={styles.toolsContainer}>
          <div className={styles.toolsLabel}>Paint</div>
          <div className={styles.tools}>
            <button className={styles.selected}><IoIosBrush /></button>
          </div>
        </div>
        <div className={styles.pickerContainer}>
          <SketchPicker
            color={this.props.color}
            onChangeComplete={this.handleChangeColor}
            styles={pickerStyles}
            disableAlpha />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    color: state.paintColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeColor: (color) => dispatch(actions.updatePaintColor(color))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaintTools);