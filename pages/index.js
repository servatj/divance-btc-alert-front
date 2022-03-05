import Head from 'next/head';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import calc from '../lib/calc';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import Search from '../components/Search';

export default function Home({ dataProps, rows }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'pair',
      key: 'pair',
      fixed: 'left',
      render: (text, record) => {
        return (
          <div className="flex align-middle">
            <Image
              alt="logo"
              width="40px"
              height="40px"
              src={`/${record.logo_url}.png`}
              className="px-4 h-8"
            />
            <Link href={`/pair/${text}`}>
              <a className="hover:bg-gray-700 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {text}
              </a>
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
    },
    {
      title: 'ATH',
      dataIndex: 'high',
      key: 'high',
    },
    {
      title: 'ATH Bar',
      dataIndex: 'priceDropBar',
      key: 'priceDropBar',
      render: (text, record) => (
        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
          <div
            style={{
              width: `${calc.getDropBar(record.currentPrice, record.high)}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
          ></div>
        </div>
      ),
    },
    {
      title: 'ATH Drop',
      dataIndex: 'priceDrop',
      key: 'priceDrop',
      render: (text, record) => {
        return (
          <>
            <p className="font-bold align-middle">{text} %</p>
          </>
        );
      },
    },
    {
      title: 'Drop Date',
      dataIndex: 'price_date',
      key: 'price_date',
      render: (text) => (
        <p className="text-purple-600 font-bold"> 🗓️ {new Date(text).toDateString()} </p>
      ),
    },
    {
      title: 'Total Supply',
      dataIndex: 'totalSupply',
      key: 'totalSuypply',
      render: (text) => {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: 'Networks',
      key: 'networks',
      dataIndex: 'networks',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col py-10 bg-purple-600">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="font-bangers text-3xl text-white">Welcome to Divance </h1>
          <div className="grid gap-4 sm:grid-cols-4 ">
            <p className="font-bangers text-2xl text-white">🟣 Crypto Community 🟣</p>
            <p className="font-bangers text-2xl text-white">🟣 Dex Portfolio (comming soon) 🟣</p>
            <p className="font-bangers text-2xl text-white">🟣 NFT viewer (comming soon) 🟣</p>
            <p className="font-bangers text-2xl text-white">🟣 launchpad & more 🟣</p>
          </div>

          <div className="px-4 py-6 sm:px-0 border-red-200 border-t-2 border-b-2">
            Crypto News --&gt; Coming Soon
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bangers text-6xl p-10 text-white font-10xl">
          Make better decisions with the right Data ! ⬇️{' '}
        </h1>
        <Search />
        <Table
          columns={columns}
          rowKey="pair"
          dataSource={rows}
          scroll={{ x: 1500 }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30'],
          }}
          onRow={(record) => {
            return {
              onClick: (event) => Router.push(`/pair/${record.pair}`),
            };
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bangers text-6xl p-10 text-yellow-600 font-10xl">
          Never miss an ATH join the telegram group !{' '}
        </h1>
        <section className="flex">
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
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  let rows;

  const fetchAth = async () => {
    const result = await fetch(`https://api.divance.app/ath`);
    const response = await result.json();
    rows = response.rows;
    return rows;
  };

  const dataProps = {
    pairRows: await fetchAth(),
  };

  return {
    props: {
      dataProps,
      rows,
    },
  };
};
