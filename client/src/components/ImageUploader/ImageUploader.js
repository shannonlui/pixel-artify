import React from 'react';

import styles from './ImageUploader.module.css';

const imageUploader = (props) => (
  <div className={styles.uploader}>
    <label htmlFor="file">
      Upload Image
    </label>
    <input type="file" id="file" accept="image/*" onChange={props.onUploadImage} />
  </div>
);

export default imageUploader;