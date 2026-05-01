fetch('https://craftifue.store/assets/index-COWPQJF2.css')
  .then(res => res.text())
  .then(text => {
    // print context around brand-olive
    const matches = text.match(/.{0,50}brand-olive.{0,50}/gi);
    console.log(matches ? Array.from(new Set(matches)).join('\n') : "not found");
  });
