import Head from "next/head";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import calc from '../lib/calc';

export default function Home({ dataProps, rows }) {
  return (
    <div className="flex flex-col py-10 h-screen bg-purple-600">
        <Head>
          <title>Nft Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center justify-center">
            <div>
              <h1 className="font-bangers text-3xl text-white">Nft Viewer </h1>
              <p className="font-bangers text-2xl text-white">🟣 Crypto Community 🟣 Dex Portfolio (comming soon) 🟣 NFT viewer (comming soon) 🟣 launchpad & more 🟣 </p>
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
            </div>
        </div>

      </div>
  );
}

export const getServerSideProps = async () => {

  return { props: {}}

};
