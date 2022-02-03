import AthDisplay from "../components/AthDisplay";
import Head from "next/head";

export default function Home({ dataProps }) {
  return (
    <>
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center bg-purple-600 h-screen">
        <h1 className="font-Nunito text-6xl text-white text-center sm:text-left sm:text-9xl">
          <span className="text-yellow-400">Coin</span> ATH
        </h1>
        <h2 className="font-Nunito text-2xl text-white text-center sm:text-left ">
          NEVER MISS AN ATH !
        </h2>
        <p className="font-Nunito text-6xl text-white text-center sm:text-left sm:text-9xl">🚀</p>
        <section className="py-4">
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

        <div className="flex flex-row items-center justify-center flex-wrap">
          {dataProps.pairRows.map((currentPair, index) => {
            return <AthDisplay key={index} currentPair={currentPair} logo={'bitcoin.png'}/>
          })}
        </div>

        {/* <Chart data={data} /> */}
     </div>

    </>
  );
}


export const getServerSideProps = async () => {
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
    return JSON.stringify(data)
  };

  const fetchAth = async () => {
    const result = await fetch(`https://api.divance.app/ath`);
    const response = await result.json();
    return response.rows;
  };

  const dataProps = {
    data: await fetchData(),
    pairRows: await fetchAth(),
  }

  return {
    props: {
      dataProps
    }
  };
};
