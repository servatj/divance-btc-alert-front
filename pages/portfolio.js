import Head from 'next/head';
import 'antd/dist/antd.css';
import { useMoralis, useERC20Balances } from 'react-moralis';
import { Skeleton, Table } from 'antd';
import { getEllipsisTxt } from '../lib/formatters';
import { getChainById } from 'lib/networks';
import ERC20Transfers from '../components/Erc20Transfers';

export default function Home({ dataProps, rows }) {
  const { chainId } = useMoralis();
  const { data: assets } = useERC20Balances({ chainId: getChainById(chainId) });
  const { Moralis } = useMoralis();

  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo) => (
        <img
          src={logo || 'https://etherscan.io/images/main/empty-token.png'}
          alt="nologo"
          width="28px"
          height="28px"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => name,
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (symbol) => symbol,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (value, item) => parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: 'Address',
      dataIndex: 'token_address',
      key: 'token_address',
      render: (address) => getEllipsisTxt(address, 5),
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
          <h1 className="font-bangers text-3xl text-white">Portfolio </h1>
          <h1 className="font-bangers text-white">💰Token Balances</h1>
          <Skeleton loading={!assets}>
            <Table
              dataSource={assets}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey={(record) => {
                return record.token_address;
              }}
            />
          </Skeleton>
          <ERC20Transfers />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
