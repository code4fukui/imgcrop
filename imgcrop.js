import { PNG } from "https://code4fukui.github.io/PNG/PNG.js";
import { JPEG } from "https://code4fukui.github.io/JPEG/JPEG.js";
import { crop } from "https://code4fukui.github.io/imgcrop/ImageDataUtil.js";

if (Deno.args.length == 0) {
  console.log("imgcrop [in png/jpeg] [x,y,w,h]+");
  Deno.exit(1);
}

const decode = async (fn) => {
  if (fn.endsWith(".png")) {
    return PNG.decode(new Uint8Array(await Deno.readFile(inpng)));
  } else if (fn.endsWith(".jpg")) {
    return JPEG.decode(new Uint8Array(await Deno.readFile(inpng)));
  }
  throw new Exception("unsupported extension");
};
const encode = (img, fn) => {
  if (fn.endsWith(".png")) {
    return PNG.encode(img);
  } else if (fn.endsWith(".jpg")) {
    return JPEG.encode(img);
  }
  throw new Exception("unsupported extension");
};

const inpng = Deno.args[0];
const org = await decode(inpng);
const ext = inpng.substring(inpng.lastIndexOf("."));
for (let i = 1; i < Deno.args.length; i++) {
  const [x, y, w, h] = Deno.args[i].split(",");
  const dst = crop(org, x, y, w, h);
  const outpng = inpng.substring(0, inpng.length - 4) + "_" + i + ext;
  console.log(dst);
  const png = encode(dst, outpng);
  console.log(png);
  await Deno.writeFile(outpng, png);
}
