import https from 'https';
const fetchUrl = (query) => new Promise((resolve) => {
  https.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=L-0R9F2Kj81pM32X1vYx33pP0sN9T37p_Y4M-1T3v_k&per_page=1`, res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      resolve(raw);
    });
  });
});
fetchUrl("raw natural material yarn").then(console.log);
