import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Head from 'next/head';
import Search from '../components/Search';
import TokenTable from 'components/TokenTable';

export default function Home({ dataProps, rows }) {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

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
        <TokenTable rows={rows} />
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

  console.log(dataProps);

  return {
    props: {
      dataProps,
      rows,
    },
  };
};
