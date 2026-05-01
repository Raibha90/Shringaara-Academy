const fetch = require('node-fetch');
fetch('https://craftifue.store/assets/index-BNPeVvgy.js')
  .then(res => res.text())
  .then(text => {
    // try to find "header className=" or something similar
    // The minified react code might have react.createElement("header", { className: "..." })
    // or jsx("header", { className: "bg-[#...] ..." })
    const matches = text.match(/"header",\{className:"(.*?)"/g);
    // jsx: l("header",{className:"..."})
    const jsxMatches = text.match(/l\("header",\{className:"(.*?)"/gi);
    const jsxMatches2 = text.match(/\("header",\{className:"(.*?)"/gi);
    const headClasses = text.match(/[A-Za-z0-9_]+\("header",\s*\{[^}]*className:\s*"([^"]+)"/g);
    console.log("header classes:", headClasses);
    
    // search for common dark bg classes
    const bgMatches = text.match(/bg-(gray|slate|zinc|neutral|blue)-[89]00/g);
    console.log("bgMatches:", bgMatches ? Array.from(new Set(bgMatches)) : "none");
  });
