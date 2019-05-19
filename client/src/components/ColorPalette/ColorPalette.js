import React from 'react';

import styles from './ColorPalette.module.css';

const colorPalette = (props) => {
  const saturation = (props.saturation / 100) + 1;
  const brightness = (props.brightness) * 0.75;
  const contrast = (props.contrast / 100) + 1;
  const con = 128 * (1 - contrast);

  const adjustColor = (rgb) => {
    const gray = rgb[0] * 0.3086 + rgb[1] * 0.6094 + rgb[2] * 0.0820;
    const sat = gray * (1 - saturation);
    const res = [];
    res[0] = Math.round((rgb[0] * saturation + sat + brightness) * contrast + con);
    res[1] = Math.round((rgb[1] * saturation + sat + brightness) * contrast + con);
    res[2] = Math.round((rgb[2] * saturation + sat + brightness) * contrast + con);
    if (res[0] < 0) res[0] = 0;
    if (res[1] < 0) res[1] = 0;
    if (res[2] < 0) res[2] = 0;
    if (res[0] > 255) res[0] = 255;
    if (res[1] > 255) res[1] = 255;
    if (res[2] > 255) res[2] = 255;
    return res;
  };
  
  const rgbToHex = (rgb) => (
    '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1).toUpperCase()
  );

  let colors = null;
  let hexes = {};
  if (props.palette) {
    colors = props.palette.map(rgb => {
      const hex = rgbToHex(adjustColor(rgb));
      let color = null;
      // Render color if it's unique
      if (!(hex in hexes)) {
        color = (
          <div key={hex} className={styles.container}>
            <span className={styles.square} style={{background: hex}}></span>
            <span>{hex}</span>
          </div>
        );
        hexes[hex] = 1;
      }
      return color;
    });
  }

  return (
    <div className={styles.palette}>
      {colors}
    </div>
  );
};

export default colorPalette;