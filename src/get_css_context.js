fetch('https://craftifue.store/assets/index-COWPQJF2.css')
  .then(res => res.text())
  .then(text => {
    console.log(text.match(/.{0,30}1A1A3F.{0,30}/gi));
    console.log(text.match(/.{0,30}18183B.{0,30}/gi));
    console.log(text.match(/.{0,30}101828.{0,30}/gi));
  });
