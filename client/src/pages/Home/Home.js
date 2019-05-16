import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import styles from './Home.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import ImageUploader from '../../components/ImageUploader/ImageUploader';

class Home extends Component {

  imageUploadHandler = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const img = new Image();
    img.src = url;
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
    onUploadImage: (img) => dispatch(actions.uploadImage(img))
  };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(Home);