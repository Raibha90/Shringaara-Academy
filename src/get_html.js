fetch('https://craftifue.store/assets/index-BNPeVvgy.js')
  .then(res => res.text())
  .then(text => {
    // searching for standard Header component output in react
    const idx = text.indexOf('bg-[');
    console.log("some tailwind classes", text.match(/bg-\[[A-Za-z0-9#]+\]/g));
  });
