import { crop, encode, decode } from "./ImageDataUtil.js";

/*
gap: 3px - 388x388 for Smartphone
gap: 8px - 618x618 for PC
*/

export const cropImageInsta = (img, offx, offy, imgw, nw, nh, pcmode = false) => {
  imgw = parseFloat(imgw);
  const gap = pcmode == false || pcmode == "0" || pcmode == 0 ? imgw / 388 * 3 : imgw / 618 * 8;
  console.log(gap, pcmode, imgw);
  const res = [];
  for (let i = 0; i < nh; i++) {
    for (let j = 0; j < nw; j++) {
      const x = parseFloat(offx) + (parseFloat(imgw) + gap) * j;
      const y = parseFloat(offy) + (parseFloat(imgw) + gap) * i;
      res.push(crop(img, x, y, imgw, imgw));
    }
  }
  return res;
};
