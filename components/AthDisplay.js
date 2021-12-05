import React, { useState, useEffect } from "react";
import calc from '../lib/calc'


const athDisplay = ({ currentPair, logo }) => {

  const mapPair = {
    'ETH/USDT': 'ethereum',
    'BTC/USDT': 'bitcoin',
    'ZIG/USDT': 'zignaly',
    'LUNA/USDT': 'terra-luna',
    'ATOM/USDT': 'cosmos'
  }

  const [currentPrice, setCurrentPrice] = useState(0);
  const [pairToken, setPairToken] = useState('');

  useEffect(() => {
    const getCurrentPrice = async (token) => {
      const result = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`
      );
      const response = await result.json();
      const price = response[token].usd;
      setCurrentPrice(price);
      setPairToken(token)
    };

    getCurrentPrice(mapPair[currentPair.symbol]);
  }, []);

  return (
    <div className="p-3 transform transition duration-500 hover:scale-110 cursor-pointer">
      <a href={`/pair/${pairToken}`}>
      <div className="bg-black p-6 rounded-lg shadow-lg">
        <div className="relative pt-1">
           <h1 className="text-2xl font-bold mb-2 text-white">
           <span className="text-yellow-400">ATH</span>  💲{currentPair.high}
          </h1>
          <h1 className="text-1xl font-bold mb-2 text-white">
            🗓️ DATE  {new Date(currentPair.price_date).toDateString()}
          </h1>
          <h2 className="text-1xl font-bold mb-2 text-white">
            Drop From ATH{calc.getDrop(currentPrice, currentPair.high)} %
          </h2>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
            <div
              style={{ width: `${calc.getDropBar(currentPrice, currentPair.high)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
            ></div>
          </div>
        </div>
        <div className="relative py-3">
          <div className="flex"><h2 className="text-2xl font-bold mb-2 text-white">{currentPair.symbol}</h2><img src={`${mapPair[currentPair.symbol]}.png`} className="px-4 h-8"/></div>
          <div className="bg-purple-600 p-6 rounded-lg shadow-lg items-center text-center">
            <p className="text-white text-2xl font-bold">
              {currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USD
            </p>
          </div>
        </div>
      </div>
      </a>
    </div>
    );
};

export default athDisplay;
