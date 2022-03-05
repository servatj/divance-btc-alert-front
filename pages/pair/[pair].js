import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import Image from 'next/image';
import TokenInfo from '../../components/TokenInfo';
import Post from '../../components/Post';
import Link from 'next/link';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const getChartColors = (isChangePositive) => {
  return isChangePositive
    ? { gradient1: '#00E7B0', gradient2: '#0C8B6C', stroke: '#31D0AA' }
    : { gradient1: '#ED4B9E', gradient2: '#ED4B9E', stroke: '#ED4B9E ' };
};

export default function PostPage() {
  const router = useRouter();
  const [data, setData] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [pairInfo, setPairInfo] = useState({
    price_date: new Date(),
    symbol: '',
    high: 0,
  });

  useEffect(() => {
    const getCurrentPrice = async (MARKET_CHART_ID) => {
      if (MARKET_CHART_ID) {
        const result = await fetch(
          `https://api.coingecko.com/api/v3/coins/${MARKET_CHART_ID}/market_chart?vs_currency=usd&days=1&interval=hourly`
        );
        const { prices } = await result.json();
        const priceGroup = prices.reverse().map((price, index) => {
          const [, value] = price;
          if (index === 0) {
            setCurrentPrice(value.toFixed(2));
          }
          const hour = DateTime.now().plus({ hours: -index }).hour;
          return {
            name: DateTime.fromISO(
              `${hour.toString().length === 1 ? '0' + hour : hour}:00`
            ).toFormat('h:mm a'),
            uv: value,
          };
        });

        const data = await fetch(`https://api.divance.app/ath/pair/${router.query.pair}`);
        const { tokenListMerged } = await data.json();

        const pairInfo = {
          symbol: tokenListMerged.symbol,
          high: tokenListMerged.high,
          price_date: tokenListMerged.price_date,
          currentPrice: tokenListMerged.currentPrice,
          pair: tokenListMerged.pair,
        };

        console.log(router.query.pair, tokenListMerged);
        setPairInfo(pairInfo);
        setData(priceGroup.reverse());
      }
    };
    getCurrentPrice(router.query.pair);
  }, [router.query.pair]);

  return (
    <div className="h-screen bg-purple-600">
      <div className="flex flex-wrap py-5 bg-purple-600">
        <p className="px-2 text-2xl font-bold">
          <Link href="/" className="text-white px-2 text-2xl font-semibold">
            home
          </Link>
          / {router.query.pair}
        </p>
      </div>

      <div className="sm:px-10 grid grid-cols-1 grid-rows-4 gap-4">
        <div className="flex flex-col w-12/12 h-4/4  bg-gray-800 ui-chart">
          <div className="bg-gray-800 text-purple-400 text-2xl w-full p-4">
            <div className="flex flex-wrap align-baseline">
              <div className="text-white text-4xl font-bold">
                <h2 className="text-4xl font-bold mb-2 text-white">{currentPrice}</h2>
              </div>
              <div className="mx-4">
                {' '}
                <Image alt="pair-logo" src={`/${router.query.pair}.png`} width="20" height="25" />
              </div>
              <div className=" font-bold">
                {router.query.pair ? router.query.pair.toUpperCase() : ''} / USDT{' '}
              </div>
            </div>
            <p className="text-purple-200 mx-2">{new Date().toDateString()}</p>
          </div>
          <ResponsiveContainer className="bg-gray-800 w-full h-1">
            <AreaChart
              height={100}
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={'#fff'} stopOpacity={0.34} />
                  <stop offset="100%" stopColor={'#A78BFA'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                minTickGap={8}
                // tickFormatter={(time) => time.toLocaleString('en', dateFormatting)}
              />
              <YAxis axisLine={false} tickLine={false} domain={['auto', 'auto']} hide />
              <Tooltip cursor={{ stroke: '#ccc' }} contentStyle={{ display: 'none' }} />
              <Area
                type="linear"
                dataKey="uv"
                stroke="#D6A2E8"
                fill="url(#gradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex bg-gray-800">
          <TokenInfo currentPair={pairInfo} />
          <div>
            <div className="flex p-3">
              <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4  m-x-2 rounded-full">
                Website
              </button>
              <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 m-x-2 rounded-full">
                Coinmarketcap
              </button>
            </div>
            <h1 className="px-2 py-4 font-nunito text-2xl text-purple-600">What is bitcoin</h1>
            <Post fullPath={'../../posts/bitcoin.yml'} />
          </div>
        </div>
      </div>
    </div>
  );
}
