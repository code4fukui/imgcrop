import { crop, encode, decode } from "./ImageDataUtil.js";

if (Deno.args.length == 0) {
  console.log("imgcrop [in png/jpeg] [x,y,w,h]+");
  Deno.exit(1);
}

const inpng = Deno.args[0];
const inbin = await Deno.readFile(inpng);
const org = await decode(inpng, inbin);
const ext = inpng.substring(inpng.lastIndexOf("."));
for (let i = 1; i < Deno.args.length; i++) {
  const [x, y, w, h] = Deno.args[i].split(",");
  const dst = crop(org, x, y, w, h);
  const outpng = inpng.substring(0, inpng.length - 4) + "_" + i + ext;
  const png = encode(dst, outpng);
  await Deno.writeFile(outpng, png);
}
