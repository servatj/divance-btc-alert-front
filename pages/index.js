import React, { useState, useEffect } from 'react';
import Chart from "../components/Chart";
import Image from 'next/image'
import Head from "next/head";
import rocket from '../public/rocket.png'

export default function Home() {
  const [data, setData] = useState([]);
  const [ath, setAth] = useState(0);
  const [athDate, setAthDate] = useState('');

  function handleSignInEmailFieldChange(event) {
    event.preventDefault();
    setSignInEmail(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json`);
      const response = await result.json();
      const data = await Object.keys(response.bpi).map(date => {
        return {
           date: new Date(date),
           price: response.bpi[date]
          };
       })
      setData(data);
    };

    const fetchAth = async () => {
      const result = await fetch(`https://api.divance.app/ath`);
      const response = await result.json();
      setAth(response.rows.high)
      setAthDate(response.rows.price_date)
    };

    fetchData();
    fetchAth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-600">
      <Head>
        <title>BTC Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-Nunito text-9xl text-white text-center sm:text-left"><span className="text-yellow-400">₿</span> ATH ${ath}</h1>
        <h2 className="font-Nunito text-2xl text-white text-center sm:text-left">{new Date(athDate).toDateString()}</h2>
        <Image
          src={rocket}
          alt="Rocket goin to the moon"
          width={200}
          height={300}
        />
        <a href="https://t.me/divanceath" className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">Join Telegram Alert</span>
        </a>
        {/* <Chart data={data} /> */}
      </div>
    </div>
  );
}
