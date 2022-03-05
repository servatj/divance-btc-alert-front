import Head from "next/head";
import "antd/dist/antd.css";
import calc from "../lib/calc";
import Image from "next/image";

export default function Home({ dataProps, rows }) {
  return (
    <div className="flex flex-col py-10 h-screen bg-purple-600">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="font-bangers text-3xl text-white">Calendar </h1>
          <p className="font-bangers text-2xl text-white">
            🟣 Crypto Community 🟣 Dex Portfolio (comming soon) 🟣 NFT viewer (comming soon) 🟣
            launchpad & more 🟣{" "}
          </p>
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-lg h-96">
              <p className="font-bangers text-6xl text-white">Coming Soon !!!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
