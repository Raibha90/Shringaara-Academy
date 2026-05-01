import https from 'https';
const queries = [
  "raw natural material yarn",
  "artisan working clay pottery",
  "artisan hands details",
  "beautiful ceramic vase decor"
];

const fetchUrl = (query) => new Promise((resolve) => {
  https.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=L-0R9F2Kj81pM32X1vYx33pP0sN9T37p_Y4M-1T3v_k&per_page=1`, res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      try {
        resolve(query + " " + JSON.parse(raw).results[0].urls.raw);
      } catch (e) {
        resolve(query + " error");
      }
    });
  });
});

async function run() {
  for (const q of queries) {
    console.log(await fetchUrl(q));
  }
}
run();
