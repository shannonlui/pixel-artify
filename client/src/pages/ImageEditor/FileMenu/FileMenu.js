import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FiHome, FiRefreshCcw, FiSave } from 'react-icons/fi';

import * as actions from '../../../store/actions';
import styles from './FileMenu.module.css';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';

function FileMenu(props) {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showHomeModal, setShowHomeModal] = useState(false);

  const handleOpenResetModal = () => setShowResetModal(true);
  const handleCloseResetModal = () => setShowResetModal(false);
  const handleOpenHomeModal = () => setShowHomeModal(true);
  const handleCloseHomeModal = () => setShowHomeModal(false);

  const handleReset = () => {
    // Reset by re-uploading the image
    props.onLoadImage(props.img);
    props.onLoadImageSuccess();
    props.resetCanvas();
    setShowResetModal(false);
  };

  const renderResetModal = () => {
    return (
      <Modal 
        onClose={handleCloseResetModal}
        onSubmit={handleReset}
        header="Are you sure you want to reset?">
          You will lose all the changes you made.
      </Modal>
    )
  };

  const handleReturnHome = () => props.history.push("/");

  const renderHomeModal = () => {
    return (
      <Modal 
        onClose={handleCloseHomeModal}
        onSubmit={handleReturnHome}
        header="Are you sure you want to leave this page?">
          You will lose all the changes you made.
      </Modal>
    )
  };

  return (
    <div className={styles.container}>
      <Button small onClick={handleOpenHomeModal} secondary><FiHome />Home</Button>  
      <Button small onClick={handleOpenResetModal} secondary><FiRefreshCcw />Reset</Button>  
      <Button small onClick={props.exportImage} primary><FiSave />Export</Button>
      {showResetModal && renderResetModal()}
      {showHomeModal && renderHomeModal()}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    img: state.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadImage: (img) => dispatch(actions.loadImage(img)),
    onLoadImageSuccess: () => dispatch(actions.loadImageSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileMenu);