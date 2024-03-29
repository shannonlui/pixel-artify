import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import styles from './Home.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import demoImg from '../../assets/images/demo.png';

class Home extends Component {

  imageUploadHandler = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const img = new Image();
    img.src = url;
    this.props.onUploadImage(img);
    this.props.history.push('/editor');
  }

  demoImageHandler = () => {
    const img = new Image();
    img.src = demoImg;
    this.props.onUploadImage(img);
    this.props.history.push('/editor');
  }

  render() {
    return(
      <React.Fragment>
        <Toolbar theme="light" />
        <div className={styles.bg}>
          <div className={styles.content}>
            <h1>Transform images into pixel art.</h1>
            <ImageUploader onUploadImage={this.imageUploadHandler} />
            <button className={styles.sample} onClick={this.demoImageHandler}>
              Demo
            </button>
          </div>
        </div>        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    img: state.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUploadImage: (img) => dispatch(actions.loadImage(img))
  };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(Home);