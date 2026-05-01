fetch('https://cratifue.store/')
  .then(res => res.text())
  .then(text => console.log(text.substring(0, 300)))
  .catch(e => console.error(e));
