const getDrop = (currentPrice, highPrice) => {
  return parseInt(100 - (currentPrice / highPrice) * 100)
}

export default {
  getDrop
}
