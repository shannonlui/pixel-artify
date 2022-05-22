import React from 'react';
import { FiX } from 'react-icons/fi';

import styles from './Modal.module.css';
import Button from '../Button/Button';

function Modal(props) {
  return (
    <div className={styles.background} onClick={props.onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button onClick={props.onClose} className={styles.closeBtn}><FiX /></button>
        {
          props.header && <div className={styles.header}>
            {props.header}
          </div>
        }
        { props.header && <hr /> }
        <div className={styles.body}>
          {props.children}
        </div>
        <div className={styles.footer}>
          <Button onClick={props.onClose} secondary>Cancel</Button>
          <Button onClick={props.onSubmit} primary>Ok</Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;