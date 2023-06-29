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
