fetch('https://craftifue.store/assets/index-COWPQJF2.css')
  .then(res => res.text())
  .then(text => {
    const matchesBg = text.match(/background-color: ?#([A-Fa-f0-9]{3,6})/g);
    const matchesColor = text.match(/color: ?#([A-Fa-f0-9]{3,6})/g);
    console.log("Bg matches", matchesBg ? Array.from(new Set(matchesBg)).join('\n') : "none");
    console.log("Color matches", matchesColor ? Array.from(new Set(matchesColor)).join('\n') : "none");
  });
