import Head from 'next/head';
import Search from '../components/Search';
import TokenTable from 'components/TokenTable';

export default function Home({ dataProps, rows }) {
  return (
    <div className="flex flex-col py-10 bg-black">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


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

  return {
    props: {
      dataProps,
      rows,
    },
  };
};
