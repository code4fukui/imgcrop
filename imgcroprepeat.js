import { crop, encode, decode } from "./ImageDataUtil.js";

if (Deno.args.length == 0) {
  console.log("imgcroprepeat [in png/jpeg] offx,offy,w,h,gapw,gaph,nw,nh");
  Deno.exit(1);
}

const inpng = Deno.args[0];
const inbin = await Deno.readFile(inpng);
const org = await decode(inpng, inbin);
const ext = inpng.substring(inpng.lastIndexOf("."));
const [offx, offy, w, h, gapw, gaph, nw, nh] = Deno.args[1].split(",").map(i => parseInt(i));
let idx = 1;
for (let i = 0; i < nh; i++) {
  for (let j = 0; j < nw; j++) {
    const x = offx + j * (w + gapw);
    const y = offy + i * (h + gaph);
    console.log(x, y, w, h);
    const dst = crop(org, x, y, w, h);
    const outpng = inpng.substring(0, inpng.length - 4) + "_" + idx++ + ext;
    const png = encode(dst, outpng);
    await Deno.writeFile(outpng, png);
  }
}
