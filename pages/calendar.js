import Head from "next/head";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import calc from '../lib/calc'

export default function Home({ dataProps, rows }) {

  const columns = [
    {
      title: "Name",
      dataIndex: "pair",
      key: "pair",
      fixed: 'left',
      render: (text, record) => {
        return (
          <div className="flex align-middle">
            <img width='60px' height='60px' src={`${record.logo_url}.png`} className="px-4 h-8"/>
            <strong>{text}</strong>
          </div>
        )
      }
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      key: "currentPrice"
    },
    {
      title: "ATH",
      dataIndex: "high",
      key: "high"
    },
    {
      title: "ATH Bar",
      dataIndex: "priceDropBar",
      key: "priceDropBar",
      render: (text, record) => (
        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
          <div
            style={{ width: `${calc.getDropBar(record.currentPrice, record.high)}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
          ></div>
        </div>
      )
    },
    {
      title: "ATH Drop",
      dataIndex: "priceDrop",
      key: "priceDrop",
      render: (text, record) => {
        return <><p className="font-bold align-middle">{text} %</p></>
      }
    },
    {
      title: "Drop Date",
      dataIndex: "price_date",
      key: "price_date",
      render: (text) => (
        <p className="text-purple-600 font-bold"> 🗓️ {new Date(text).toDateString()} </p>
      )
    },
    {
      title: "Total Supply",
      dataIndex: "totalSupply",
      key: "totalSuypply",
      render: (text) => {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    {
      title: "Networks",
      key: "networks",
      dataIndex: "networks",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
  ];

  return (
    <div className="flex flex-col py-10 h-screen bg-purple-600">
        <Head>
          <title>ATH Alert</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center justify-center">
            <div>
              <h1 className="font-bangers text-3xl text-white">Calendar </h1>
              <p className="font-bangers text-2xl text-white">🟣 Crypto Community 🟣 Dex Portfolio (comming soon) 🟣 NFT viewer (comming soon) 🟣 launchpad & more 🟣 </p>
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

  return { props: {}}

};
