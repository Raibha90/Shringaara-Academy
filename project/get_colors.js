fetch('https://craftifue.store/assets/index-BNPeVvgy.js')
  .then(res => res.text())
  .then(text => {
    const matches = text.match(/bg-\[[#a-fA-F0-9]{4,7}\]/g);
    if(matches) {
       console.log(Array.from(new Set(matches)).join('\n'));
    }
  });
