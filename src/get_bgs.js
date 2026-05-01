fetch('https://craftifue.store/assets/index-BNPeVvgy.js')
  .then(res => res.text())
  .then(text => {
    // print all bg- classes
    const bgs = text.match(/bg-[a-zA-Z0-9\[\]#-]+/g);
    // count frequencies
    const counts = {};
    bgs.forEach(b => counts[b] = (counts[b] || 0) + 1);
    console.log(Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 30));
  });
