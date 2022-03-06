import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import calc from '../lib/calc';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';

const TokenTable = ({ rows }) => {
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
  );
};

export default TokenTable;
