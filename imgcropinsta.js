import { encode, decode } from "./ImageDataUtil.js";
import { makeImagesForInsta } from "./cropImageInsta.js";

if (Deno.args.length == 0) {
  console.log("imgcropinsta [in png/jpeg] [offx,offy,imgw,nw,nh,pcmode=0]");
  Deno.exit(1);
}

const inpng = Deno.args[0];
const inbin = await Deno.readFile(inpng);
const [offx, offy, imgw, nw, nh, pcmode] = Deno.args[1].split(",");
const outs = await makeImagesForInsta(inpng, inbin, offx, offy, imgw, nw, nh, pcmode);
for (const out of outs) {
  await Deno.writeFile(out.name, out.data);
}
