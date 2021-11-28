import React, { useState, useEffect } from "react";
import AthDisplay from "../components/AthDisplay";
import Image from "next/image";
import Head from "next/head";
import rocket from "../public/rocket.png";

export default function Home() {
  const [data, setData] = useState([]);
  const [pairRows, setPairRows] = useState([]);
  const [athDate, setAthDate] = useState("");

  function handleSignInEmailFieldChange(event) {
    event.preventDefault();
    setSignInEmail(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.coindesk.com/v1/bpi/historical/close.json`
      );
      const response = await result.json();
      const data = await Object.keys(response.bpi).map((date) => {
        return {
          date: new Date(date),
          price: response.bpi[date],
        };
      });
      setData(data);
    };

    const fetchAth = async () => {
      const result = await fetch(`${process.env.API_URL || 'http://localhost:4000'}/ath`);
      const response = await result.json();
      console.log(response)
      setPairRows(response.rows);
      // setAthDate(response.rows.price_date);
    };

    fetchData();
    fetchAth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-600">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-Nunito text-6xl text-white text-center sm:text-left sm:text-9xl">
          <span className="text-yellow-400">Coin</span> ATH
        </h1>
        <h2 className="font-Nunito text-2xl text-white text-center sm:text-left ">
          NEVER MISS AN ATH !
        </h2>
        <Image
          src={rocket}
          alt="Rocket goin to the moon"
          width={200}
          height={300}
        />
        <section className="py-4">
          <a
            href="https://t.me/divanceath"
            className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
          >
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              Join Telegram Alert
            </span>
          </a>
        </section>

        <div className="flex flex-row items-center justify-center flex-wrap">
          {pairRows.map((currentPair) => {
            console.log(currentPair)
            return <AthDisplay currentPair={currentPair} logo={'bitcoin.png'}/>
          })}
        </div>

        <div className="relative py-9">
          <div className="flex items-center justify-center space-x-3">
            <a
              href="https://www.instagram.com/divance_community/"
              className="bg-purple-600 px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            >
              <img src="https://img.icons8.com/small/40/000000/instagram-new.png" />
            </a>
            <a
              href="https://twitter.com/divance7"
              className="bg-purple-600 px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            >
              <img src="https://img.icons8.com/material/40/000000/twitter--v1.png" />
            </a>
            <a
              href="https://discord.gg/AwrM7xYkvF"
              className="bg-purple-600 px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            >
              <img src="https://img.icons8.com/ios-glyphs/40/000000/discord-logo.png" />
            </a>
            <a
              href="https://github.com/divance-cryptos"
              className="bg-purple-600 px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            >
              <img src="https://img.icons8.com/ios-glyphs/40/000000/github.png" />
            </a>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <p className="text-1xl text-white">
              {" "}
              --> powered by Divance http://divance.app{" "}
            </p>
          </div>
        </div>

        {/* <Chart data={data} /> */}
      </div>
    </div>
  );
}
