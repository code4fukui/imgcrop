import { PNG } from "https://code4fukui.github.io/PNG/PNG.js";
import { crop } from "./ImageDataUtil.js";

if (Deno.args.length == 0) {
  console.log("imgcrop [in png] [x,y,w,h]+");
  Deno.exit(1);
}

const inpng = Deno.args[0];
const org = PNG.decode(new Uint8Array(await Deno.readFile(inpng)));
console.log(org);
for (let i = 1; i < Deno.args.length; i++) {
  const [x, y, w, h] = Deno.args[i].split(",");
  const dst = crop(org, x, y, w, h);
  const outpng = inpng.substring(0, inpng.length - 4) + "_" + i + ".png";
  console.log(dst);
  const png = PNG.encode(dst);
  console.log(png);
  await Deno.writeFile(outpng, png);
}
