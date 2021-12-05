import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getChartColors = (isChangePositive) => {
  return isChangePositive
    ? { gradient1: "#00E7B0", gradient2: "#0C8B6C", stroke: "#31D0AA" }
    : { gradient1: "#ED4B9E", gradient2: "#ED4B9E", stroke: "#ED4B9E " };
};

export default function PostPage() {
  const colors = getChartColors(true);
  const router = useRouter();

  const [data, setData] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

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
              `${hour.toString().length === 1 ? "0" + hour : hour}:00`
            ).toFormat("h:mm a"),
            uv: value,
          };
        });
        setData(priceGroup.reverse());
      }
    };
    getCurrentPrice(router.query.pair);
  }, [router.query.pair]);

  return (
    <div className="flex flex-col items-center h-screen py-10 bg-purple-600">
      <div className="flex flex-wrap py-5 bg-purple-600">
        <p className= "px-2 text-2xl font-bold"><a href="/" className="text-white px-2 text-2xl font-semibold">home</a>/ {router.query.pair}</p>
      </div>
      <div className="flex flex-col w-8/12 h-2/4 bg-gray-800 ui-chart">
        <div className="bg-gray-800 text-purple-400 text-2xl w-full p-4">
          <span className="text-white text-4xl p-2 font-bold">{currentPrice}</span>
          <span className="m-2 font-bold">{router.query.pair ? router.query.pair.toUpperCase() : ""} / USDT </span>
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
                <stop offset="5%" stopColor={"#fff"} stopOpacity={0.34} />
                <stop offset="100%" stopColor={"#A78BFA"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              minTickGap={8}
              // tickFormatter={(time) => time.toLocaleString('en', dateFormatting)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
              hide
            />
            <Tooltip
              cursor={{ stroke: "#ccc" }}
              contentStyle={{ display: "none" }}
            />
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
    </div>
  );
}
