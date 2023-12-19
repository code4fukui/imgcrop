import { encode, decode } from "./ImageDataUtil.js";
import { cropImageInsta } from "./cropImageInsta.js";

if (Deno.args.length == 0) {
  console.log("imgcropinsta [in png/jpeg] [offx,offy,imgw,nw,nh,pcmode=0]");
  Deno.exit(1);
}

const inpng = Deno.args[0];
const inbin = await Deno.readFile(inpng);
const org = await decode(inpng, inbin);
const ext = inpng.substring(inpng.lastIndexOf("."));
const [offx, offy, imgw, nw, nh, pcmode] = Deno.args[1].split(",");
const dests = cropImageInsta(org, offx, offy, imgw, nw, nh, pcmode);
for (let i = dests.length - 1; i >= 0; i--) {
  const outpng = inpng.substring(0, inpng.length - 4) + "_" + (dests.length - i) + ext;
  const png = encode(dests[i], outpng);
  await Deno.writeFile(outpng, png);
}
