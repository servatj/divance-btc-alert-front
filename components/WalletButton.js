import { InjectedConnector } from '@web3-react/injected-connector'
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

const WalletButton = ({ connected }) => {
  return (
    <button  class="inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline">
      {connected ? 'Wallet Connected' : 'Wallent Connect'}
    </button>
  );
}

export default WalletButton;