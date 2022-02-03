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
      render: (text) => <strong>{text}</strong>
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
      key: "priceDrop"
    },
    {
      title: "Drop Date",
      dataIndex: "price_date",
      key: "price_date",
      render: (text) => (
        <a> 🗓️ {text} </a>
      )
    },
    {
      title: "Total Supply",
      dataIndex: "totalSupply",
      key: "totalSuypply"
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
    <div className="flex flex-col  sm:h-screen py-10 bg-purple-600">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center">
          <Table columns={columns} dataSource={rows} scroll={{ x: 1500 }}  />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {

  let rows;

  const fetchData = async () => {
    const result = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json`);
    const response = await result.json();
    const data = await Object.keys(response.bpi).map((date) => ({
      date: new Date(date),
      price: response.bpi[date],
    }));
    return JSON.stringify(data);
  };

  const fetchAth = async () => {
    const result = await fetch(`https://api.divance.app/ath`);
    const response = await result.json();
    rows = response.rows;
    return rows;
  };

  const dataProps = {
    data: await fetchData(),
    pairRows: await fetchAth(),
  }

  return {
    props: {
      dataProps,
      rows
    }
  };
};
