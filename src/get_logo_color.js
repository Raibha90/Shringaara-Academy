import { Jimp } from 'jimp';
async function test() {
  const img = await Jimp.read('public/logo.png');
  const color = img.getPixelColor(10, 10);
  console.log('Top Left Hex:', color.toString(16));
}
test();
