const getDrop = (currentPrice, highPrice) => {
  return parseInt(100 - (currentPrice / highPrice) * 100) < 0 ? 0 : parseInt(100 - (currentPrice / highPrice) * 100);
}


const getDropBar = (currentPrice, highPrice) => {
  return parseInt((currentPrice / highPrice) * 100) > 100 ? 100 : parseInt((currentPrice / highPrice) * 100);
}

export default {
  getDrop, getDropBar
}
