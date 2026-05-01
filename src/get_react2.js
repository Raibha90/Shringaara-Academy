fetch('https://craftifue.store/assets/index-BNPeVvgy.js')
  .then(res => res.text())
  .then(text => {
    // try to find "header className=" or something similar
    // The minified react code might have react.createElement("header", { className: "..." })
    // or jsx("header", { className: "bg-[#...] ..." })
    const matches = text.match(/"header",\{className:"(.*?)"/g);
    // jsx: l("header",{className:"..."})
    const headClasses = text.match(/[\w$]\("header"\s*,\s*\{(?:[^}]*,)?className:\s*"([^"]+)"/g);
    // simpler match
    const headerCls = text.match(/"header",(\w+\()?\{className:"([^"]+)"/g);
    if (headerCls) {
       console.log("header classes:", headerCls);
    } else {
       console.log("No specific header class found");
       // regex match near "header" and "className"
       const ctx = text.match(/.{0,20}"header".{0,50}className:"[^"]+".{0,20}/g);
       console.log("context:", ctx);
    }
    
    // search for common dark bg classes
    const bgMatches = text.match(/bg-(gray|slate|zinc|neutral|blue|black)-[89]00/g);
    console.log("bgMatches:", bgMatches ? Array.from(new Set(bgMatches)) : "none");
  });
