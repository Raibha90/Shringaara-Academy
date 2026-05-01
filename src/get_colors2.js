fetch('https://craftifue.store/assets/index-COWPQJF2.css')
  .then(res => res.text())
  .then(text => {
    const matchesBgMatch = text.matchAll(/#([A-Fa-f0-9]{3,6})/g);
    const setMatches = new Set();
    for (const match of matchesBgMatch) {
      setMatches.add(match[0]);
    }
    console.log("Colors:", Array.from(setMatches).join('\n'));
  });
