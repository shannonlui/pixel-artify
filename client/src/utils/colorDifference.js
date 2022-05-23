export function getColorDifference(rgb1, rgb2) {
  const lab1 = convertRgbToLgb(rgb1);
  const lab2 = convertRgbToLgb(rgb2);
  return deltaE(lab1, lab2);
}

export function convertRgbToLgb(rgb) {
  const xyz = convertRgbToXyz(rgb);
  const lab = convertXyzToLab(xyz);
  return lab;
}

// https://stackoverflow.com/a/5624139
export function convertRgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Convert Standard-RGB to XYZ color space. Adapted from 
 * http://www.easyrgb.com/en/math.php
 * 
 * @param {Array} rgb 
 */
export function convertRgbToXyz(rgb) {
  //sR, sG and sB (Standard RGB) input range = 0 ÷ 255
  //X, Y and Z output refer to a D65/2° standard illuminant.
  let varR = rgb[0] / 255;
  let varG = rgb[1] / 255;
  let varB = rgb[2] / 255;

  if (varR > 0.04045) { 
    varR = Math.pow((varR + 0.055) / 1.055, 2.4);
  } else {
    varR = varR / 12.92;
  }

  if (varG > 0.04045) {
    varG = Math.pow((varG + 0.055) / 1.055, 2.4);
  } else {
    varG = varG / 12.92;
  }                  
           
  if (varB > 0.04045) {
    varB = Math.pow((varB + 0.055) / 1.055, 2.4);
  } else {
    varB = varB / 12.92;
  }                  

  varR = varR * 100;
  varG = varG * 100;
  varB = varB * 100;

  const X = varR * 0.4124 + varG * 0.3576 + varB * 0.1805;
  const Y = varR * 0.2126 + varG * 0.7152 + varB * 0.0722;
  const Z = varR * 0.0193 + varG * 0.1192 + varB * 0.9505;
  // console.log("XYZ: ", X, Y, Z);
  return [X, Y, Z];
}

/**
 * Convert XYZ to CIELAB color space. Adapted from 
 * http://www.easyrgb.com/en/math.php
 * 
 * @param {Array} xyz 
 */
export function convertXyzToLab(xyz) {
  // CIE Illuminant Reference: D65 Daylight, sRGB, Adobe-RGB
  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  let varX = xyz[0] / refX;
  let varY = xyz[1] / refY;
  let varZ = xyz[2] / refZ;
  
  if (varX > 0.008856) {
    varX = Math.pow(varX, 1/3);
  } else {
    varX = (7.787 * varX) + (16 / 116);
  }

  if (varY > 0.008856) {
    varY = Math.pow(varY, 1/3);
  } else {
    varY = (7.787 * varY) + (16 / 116);
  }

  if (varZ > 0.008856) {
    varZ = Math.pow(varZ , 1/3);
  } else {
    varZ = (7.787 * varZ) + (16 / 116);
  }
  
  const cieL = (116 * varY) - 16;
  const cieA = 500 * (varX - varY);
  const cieB = 200 * (varY - varZ );
  // console.log('LAB: ', cieL, cieA, cieB);
  return [cieL, cieA, cieB];
}

/**
 * Calculate the perceptual distance between colors in CIELAB (CIE94)
 * https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs
 * https://gist.github.com/ryancat/9972419b2a78f329ce3aebb7f1a09152
 * 
 * @param {Array} labA First LAB color in array
 * @param {Array} labB Second LAB color in array
 */
export function deltaE(labA, labB){
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}