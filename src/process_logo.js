import { Jimp } from 'jimp';

async function processLogo() {
  try {
    const img = await Jimp.read('public/logo.png');
    // We want to make #0A3142 transparent
    // Wait, the background might have slight variations (anti-aliasing).
    // Let's use colorDistance or simple thresholds.
    const bgColorInt = img.getPixelColor(0, 0); // #0A3142FF
    
    // We can use a simple loop
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Target bg is approx (10, 49, 66)
      if (Math.abs(r - 10) < 15 && Math.abs(g - 49) < 15 && Math.abs(b - 66) < 15) {
        this.bitmap.data[idx + 3] = 0; // alpha to 0
      }
    });

    await img.write('public/logo.png');
    console.log('Logo background removed.');
  } catch (err) {
    console.error(err);
  }
}
processLogo();
