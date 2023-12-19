import { PNG } from "https://code4fukui.github.io/PNG/PNG.js";
import { JPEG } from "https://code4fukui.github.io/JPEG/JPEG.js";

export const crop = (imgd, x, y, w, h) => {
  x = parseInt(x);
  y = parseInt(y);
  w = parseInt(w);
  h = parseInt(h);
  const d = new Uint8Array(w * h * 4);
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let id = (j + i * w) * 4;
      let is = ((j + x) + (i + y) * imgd.width) * 4;
      d[id++] = imgd.data[is++];
      d[id++] = imgd.data[is++];
      d[id++] = imgd.data[is++];
      d[id++] = imgd.data[is++];
    }
  }
  return { data: d, width: w, height: h };
};

export const decode = async (fn, bin) => {
  if (!(bin instanceof Uint8Array)) {
    bin = new Uint8Array(bin);
  }
  if (fn.endsWith(".png")) {
    return PNG.decode(bin);
  } else if (fn.endsWith(".jpg")) {
    return JPEG.decode(bin);
  }
  throw new Exception("unsupported extension");
};
export const encode = (img, fn) => {
  if (fn.endsWith(".png")) {
    return PNG.encode(img);
  } else if (fn.endsWith(".jpg")) {
    return JPEG.encode(img);
  }
  throw new Exception("unsupported extension");
};
