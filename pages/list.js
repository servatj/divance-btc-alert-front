import Head from "next/head";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import calc from '../lib/calc'

export default function Home({ dataProps, rows }) {

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "ATH",
      dataIndex: "ath",
      key: "ath"
    },
    {
      title: "ATH Bar",
      dataIndex: "athBar",
      key: "athBar",
      render: () => (
        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
          <div
            style={{ width: `${calc.getDropBar(35000, 69000)}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
          ></div>
        </div>
      )
    },
    {
      title: "ATH Drop",
      dataIndex: "athDrop",
      key: "athDrop"
    },
    {
      title: "Drop Date",
      dataIndex: "athDate",
      key: "athDate",
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete </a>
    //     </Space>
    //   )
    // }
  ];

  return (
    <div className="flex flex-col  sm:h-screen py-10 bg-purple-600">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center flex-wrap">
          <Table columns={columns} dataSource={rows} />
        </div>
        {/* <Chart data={data} /> */}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {

  const rows = [
    {
      key: "1",
      name: "John Brown",
      price: 32,
      ath: 6900,
      athDrop: "0.00%",
      athDate: "Nov 12, 2019",
      totalSupply: 210000000,
      address: "New York No. 1 Lake Park",
      networks: ["nice", "developer"]
    },
    {
      key: "2",
      name: "Jim Green",
      price: 42,
      ath: 6900,
      athDrop: "0.00%",
      athDate: "Nov 12, 2019",
      totalSupply: 210000000,
      address: "London No. 1 Lake Park",
      networks: ["loser"]
    },
    {
      key: "3",
      name: "Joe Black",
      price: 32,
      ath: 6900,
      athDrop: "0.00%",
      ath: 6900,
      totalSupply: 210000000,
      athDate: "Nov 12, 2019",
      address: "Sidney No. 1 Lake Park",
      networks: ["cool", "teacher"]
    }
  ];


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
    return JSON.stringify(data);
  };

  const fetchAth = async () => {
    const result = await fetch(`https://api.divance.app/ath`);
    const response = await result.json();
    console.log(rows)
    return response.rows;
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
