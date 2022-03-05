import calc from '../lib/calc';
import Image from 'next/image';

const athDisplay = ({ currentPair }) => {
  return (
    <div className="flex cursor-pointer">
      <a href={`/pair/${currentPair.pair}`}>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="relative pt-1">
            <h1 className="text-2xl font-bold mb-2 text-white">
              <span className="text-yellow-400">ATH</span> 💲{currentPair.high}
            </h1>
            <h1 className="text-1xl font-bold mb-2 text-white">
              🗓️ DATE {new Date(currentPair.price_date).toDateString()}
            </h1>
            <h2 className="text-1xl font-bold mb-2 text-white">
              Drop From ATH{calc.getDrop(currentPair.currentPrice, currentPair.high)} %
            </h2>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
              <div
                style={{ width: `${calc.getDropBar(currentPair.currentPrice, currentPair.high)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
              ></div>
            </div>
          </div>
          <div className="relative py-3">
            <div className="flex">
              <h2 className="text-2xl font-bold mb-2 text-white">{currentPair.symbol}</h2>
              <Image
                width={'40px'}
                heigth={'40px'}
                src={`/${currentPair.pair}.png`}
                className="px-4 h-8"
                alt="Token logo"
              />
            </div>
            <div className="bg-purple-600 p-6 rounded-lg shadow-lg items-center text-center">
              <p className="text-white text-2xl font-bold">
                {!currentPair.currentPrice
                  ? '0'
                  : currentPair.currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                USD
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default athDisplay;
