const https = require('https');
const queries = [
  "raw natural material yarn thread",
  "artisan hands dirty crafting pottery clay",
  "artisan hand carving details close up",
  "beautiful ceramic vase interior home decor"
];

let completed = 0;
queries.forEach(query => {
  https.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=L-0R9F2Kj81pM32X1vYx33pP0sN9T37p_Y4M-1T3v_k&per_page=1`, res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      try {
        console.log(query, JSON.parse(raw).results[0].urls.raw);
      } catch (e) {}
    });
  });
});
