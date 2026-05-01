const jimp = require('jimp');
jimp.read('public/logo.png').then(img => {
  const c = jimp.intToRGBA(img.getPixelColor(0, 0));
  console.log('Top Left:', c);
  const c2 = jimp.intToRGBA(img.getPixelColor(img.bitmap.width-1, img.bitmap.height-1));
  console.log('Bottom Right:', c2);
}).catch(console.error);
