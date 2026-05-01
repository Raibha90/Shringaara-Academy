import https from 'https';

const ids = [
  "1554520735-0a145240212f", // yarn
  "1519683935266-9eebf99619db", // pottery hands
  "1533558701576-23c65e0272fb", // pottery hands clay
  "1614032152844-0c2dc26ba6d8", 
  "1516048015710-7a3b4c8bbd02",
  "1578500494198-246f612d3b3d",
  "1608889175250-c3b0c1667d3a" 
];

const check = (id) => new Promise((resolve) => {
  https.request(`https://images.unsplash.com/photo-${id}?w=10`, {method: 'HEAD'}, res => {
    resolve(id + ' ' + res.statusCode);
  }).end();
});

async function run() {
  for (const id of ids) {
    console.log(await check(id));
  }
}
run();
