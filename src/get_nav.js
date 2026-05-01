fetch('https://craftifue.store/assets/index-BNPeVvgy.js')
  .then(res => res.text())
  .then(text => {
    // print out strings that contain "sticky top" or "fixed" and "bg-" or "z-50"
    const navMatches = text.match(/"([^"]*fixed[^"]*z-[0-9]+[^"]*bg-[^"]*)"/g);
    const stickyMatches = text.match(/"([^"]*sticky[^"]*top-0[^"]*bg-[^"]*)"/g);
    console.log("Nav matches:", navMatches);
    console.log("Sticky matches:", stickyMatches);
  });
