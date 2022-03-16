import Head from 'next/head';
import NFTBalance from 'components/NFTBalance';
import { useMoralis } from 'react-moralis';
import { getChainNameById } from 'lib/networks';

export default function Home({ dataProps, rows }) {
  const { chainId } = useMoralis();

  return (
    <div className="flex flex-col py-10 bg-purple-600">
      <Head>
        <title>Nft Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <div className="flex justify-center align-center">
          <h1 className="font-bangers text-3xl text-white">
            {' '}
            🖼 Nft Viewer {getChainNameById(chainId)}{' '}
          </h1>
        </div>
        <div className="flex justify-center align-center">
          <NFTBalance />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
